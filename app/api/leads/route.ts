import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

function base64UrlEncode(str: string | Buffer) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

let cachedAdminToken: { token: string; exp: number } | null = null;

/**
 * Generate Google OAuth2 Access Token using Firebase Admin Service Account
 */
async function getAdminAccessToken(): Promise<string | null> {
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!clientEmail || !privateKey) return null;

  privateKey = privateKey.replace(/\\n/g, '\n');
  const now = Math.floor(Date.now() / 1000);

  if (cachedAdminToken && cachedAdminToken.exp > now + 300) {
    return cachedAdminToken.token;
  }

  try {
    const header = { alg: 'RS256', typ: 'JWT' };
    const claimSet = {
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/datastore',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedClaim = base64UrlEncode(JSON.stringify(claimSet));
    const signatureInput = `${encodedHeader}.${encodedClaim}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    signer.end();
    const signature = signer.sign(privateKey);
    const encodedSignature = base64UrlEncode(signature);

    const jwt = `${signatureInput}.${encodedSignature}`;

    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!res.ok) {
      console.warn('[Firebase Auth] OAuth exchange returned status:', res.status);
      return null;
    }

    const data = await res.json();
    cachedAdminToken = { token: data.access_token, exp: now + 3600 };
    return data.access_token;
  } catch (err) {
    console.error('[Firebase Auth] Token error:', err);
    return null;
  }
}

/**
 * Universal Firebase Firestore Leads API Endpoint
 * Handles lead submissions for:
 * 1. Contact Us inquiries (type: 'contact' -> 'contact_leads' collection)
 * 2. Common Visitor Lead Capture (type: 'visitor' -> 'visitor_leads' collection)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type = 'visitor', ...leadData } = body;

    const projectId =
      process.env.FIREBASE_ADMIN_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
      'kampusfilterapp';
    const collectionName =
      type === 'contact'
        ? 'contact_leads'
        : type === 'advertiser'
          ? 'advertiser_leads'
          : 'visitor_leads';

    // Format attributes for Firebase Firestore REST Document
    const firestoreFields: Record<
      string,
      { stringValue: string } | { timestampValue: string }
    > = {};

    for (const [k, v] of Object.entries(leadData)) {
      if (v !== undefined && v !== null && v !== '') {
        if (Array.isArray(v)) {
          firestoreFields[k] = { stringValue: v.join(', ') };
        } else {
          firestoreFields[k] = { stringValue: String(v) };
        }
      }
    }

    firestoreFields['serverTimestamp'] = {
      timestampValue: new Date().toISOString(),
    };
    firestoreFields['status'] = { stringValue: 'new' };
    firestoreFields['source'] = {
      stringValue:
        type === 'contact'
          ? 'contact_us_page'
          : type === 'advertiser'
            ? 'advertise_page'
            : 'visitor_lead_capture',
    };

    // 1. Try Authenticated Admin Token (Full permissions, bypasses client rule blocks)
    const adminToken = await getAdminAccessToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    let firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}`;

    if (adminToken) {
      headers['Authorization'] = `Bearer ${adminToken}`;
    } else if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      firestoreUrl += `?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
    }

    const response = await fetch(firestoreUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ fields: firestoreFields }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[Firestore REST API] Ingestion warning (${response.status}):`,
        errorText
      );
      return NextResponse.json(
        { success: false, error: 'Failed to record lead. Please try again.' },
        { status: response.status }
      );
    }

    const resData = await response.json();
    return NextResponse.json({
      success: true,
      id: resData.name,
      collection: collectionName,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('[API Leads] Server error:', errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
