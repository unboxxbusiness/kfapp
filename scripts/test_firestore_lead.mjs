import fs from 'fs';
import path from 'path';

// Test submitting a lead directly through the Firestore API route logic
const envContent = fs.readFileSync(path.resolve('.env.local'), 'utf8');

function getEnvVar(key) {
  const match = envContent.match(new RegExp(`^${key}=["']?([^"'\\r\\n]+)["']?`, 'm'));
  return match ? match[1] : null;
}

const projectId = getEnvVar('FIREBASE_ADMIN_PROJECT_ID') || 'kampusfilterapp';
const clientEmail = getEnvVar('FIREBASE_ADMIN_CLIENT_EMAIL');
const rawKeyMatch = envContent.match(/FIREBASE_ADMIN_PRIVATE_KEY="([^"]+)"/);
let privateKey = rawKeyMatch ? rawKeyMatch[1].replace(/\\n/g, '\n') : null;

import crypto from 'crypto';

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAdminAccessToken() {
  const now = Math.floor(Date.now() / 1000);
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

  const data = await res.json();
  return data.access_token;
}

async function testLead() {
  const token = await getAdminAccessToken();
  console.log('✓ Token obtained successfully');

  // Test 1: Write to contact_leads
  const res1 = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/contact_leads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: { stringValue: 'Test Contact Lead' },
        email: { stringValue: 'test@kampusfilter.com' },
        phone: { stringValue: '+91 99999 88888' },
        message: { stringValue: 'Contact page test verification' },
        status: { stringValue: 'new' },
        source: { stringValue: 'contact_us_page' },
        timestamp: { timestampValue: new Date().toISOString() }
      }
    })
  });
  const data1 = await res1.json();
  console.log('Test 1 (contact_leads) result status:', res1.status, 'ID:', data1.name);

  // Test 2: Write to visitor_leads
  const res2 = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/visitor_leads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        name: { stringValue: 'Test Visitor Lead' },
        phone: { stringValue: '+91 98888 77777' },
        targetCourse: { stringValue: 'MBA' },
        preferredLocation: { stringValue: 'Mumbai' },
        budgetRange: { stringValue: '₹6L - ₹10L' },
        status: { stringValue: 'new' },
        source: { stringValue: 'visitor_lead_capture' },
        timestamp: { timestampValue: new Date().toISOString() }
      }
    })
  });
  const data2 = await res2.json();
  console.log('Test 2 (visitor_leads) result status:', res2.status, 'ID:', data2.name);
}

testLead().catch(console.error);
