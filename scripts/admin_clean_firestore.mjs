import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually to get exact admin credentials
const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

function getEnvVar(key) {
  const match = envContent.match(new RegExp(`^${key}=["']?([^"'\\r\\n]+)["']?`, 'm'));
  return match ? match[1] : null;
}

const projectId = getEnvVar('FIREBASE_ADMIN_PROJECT_ID') || 'kampusfilterapp';
const clientEmail = getEnvVar('FIREBASE_ADMIN_CLIENT_EMAIL');

// Handle private key format
const rawKeyMatch = envContent.match(/FIREBASE_ADMIN_PRIVATE_KEY="([^"]+)"/);
let privateKey = rawKeyMatch ? rawKeyMatch[1].replace(/\\n/g, '\n') : null;

if (!clientEmail || !privateKey) {
  console.error('Could not parse FIREBASE_ADMIN_CLIENT_EMAIL or FIREBASE_ADMIN_PRIVATE_KEY from .env.local');
  process.exit(1);
}

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken() {
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
  if (!res.ok) {
    throw new Error(`Failed to get OAuth token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

async function listCollections(accessToken) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:listCollectionIds`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pageSize: 100 }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`List collections failed: ${err}`);
  }

  const data = await res.json();
  return data.collectionIds || [];
}

async function listDocuments(accessToken, collectionId) {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}?pageSize=300`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.documents || [];
}

async function deleteDocument(accessToken, docPath) {
  const url = `https://firestore.googleapis.com/v1/${docPath}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.ok;
}

async function createDocument(accessToken, collectionId, docId, fields) {
  let url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}`;
  if (docId) {
    url += `?documentId=${docId}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to create doc in ${collectionId}: ${JSON.stringify(data)}`);
  }
  return data;
}

async function main() {
  console.log('Authenticating with Google OAuth2 using Firebase Service Account...');
  const accessToken = await getAccessToken();
  console.log('✓ Successfully authenticated as Admin:', clientEmail);

  console.log('\nFetching all existing collections in Firestore...');
  const collections = await listCollections(accessToken);
  console.log(`Found ${collections.length} collection(s):`, collections);

  // 1. Delete all documents in every existing collection
  for (const col of collections) {
    console.log(`\nProcessing collection '${col}' for deletion...`);
    const docs = await listDocuments(accessToken, col);
    console.log(`  Found ${docs.length} document(s) in '${col}'`);
    for (const d of docs) {
      console.log(`  Deleting: ${d.name}`);
      await deleteDocument(accessToken, d.name);
    }
    console.log(`✓ Cleaned collection '${col}' (Firestore removes empty collections automatically).`);
  }

  // Also check common collections if not returned by listCollectionIds (in case of subcollections)
  const candidateCollections = ['leads', 'contacts', 'inquiries', 'messages', 'visitor_leads', 'contact_leads'];
  for (const c of candidateCollections) {
    if (!collections.includes(c)) {
      const extraDocs = await listDocuments(accessToken, c);
      if (extraDocs.length > 0) {
        console.log(`Cleaning unlisted collection '${c}' (${extraDocs.length} docs)...`);
        for (const d of extraDocs) {
          await deleteDocument(accessToken, d.name);
        }
      }
    }
  }

  console.log('\n============================================================');
  console.log('CREATING FRESH NEW COLLECTIONS FOR KAMPUS FILTER');
  console.log('============================================================');

  // 2. Initialize new 'contact_leads' collection with clean structured document
  console.log("Creating new 'contact_leads' collection...");
  const contactDoc = await createDocument(accessToken, 'contact_leads', null, {
    name: { stringValue: 'Kampus Filter Advisory Desk' },
    email: { stringValue: 'admissions@kampusfilter.com' },
    phone: { stringValue: '+91 98765 00000' },
    inquiryType: { stringValue: 'Student Admissions Guidance' },
    targetCourse: { stringValue: 'BBA / MBA / Engineering' },
    message: { stringValue: 'Initialized fresh contact leads collection for Kampus Filter.' },
    source: { stringValue: 'contact_us_page' },
    status: { stringValue: 'active_schema' },
    createdAt: { timestampValue: new Date().toISOString() },
  });
  console.log(`✓ Created 'contact_leads' document:`, contactDoc.name);

  // 3. Initialize new 'visitor_leads' collection with clean structured document
  console.log("\nCreating new 'visitor_leads' collection...");
  const visitorDoc = await createDocument(accessToken, 'visitor_leads', null, {
    name: { stringValue: 'Sample Student Lead' },
    phone: { stringValue: '+91 98765 12345' },
    email: { stringValue: 'student@example.com' },
    targetCourse: { stringValue: 'B.Tech' },
    preferredLocation: { stringValue: 'Delhi NCR' },
    budgetRange: { stringValue: '₹5L - ₹10L' },
    source: { stringValue: 'visitor_lead_capture' },
    status: { stringValue: 'active_schema' },
    createdAt: { timestampValue: new Date().toISOString() },
  });
  console.log(`✓ Created 'visitor_leads' document:`, visitorDoc.name);

  console.log('\n============================================================');
  console.log('VERIFYING NEW COLLECTIONS');
  console.log('============================================================');
  const finalCollections = await listCollections(accessToken);
  console.log('Current Active Firestore Collections:', finalCollections);

  for (const fc of finalCollections) {
    const docs = await listDocuments(accessToken, fc);
    console.log(`  - ${fc}: ${docs.length} active document(s)`);
  }

  console.log('\nAll done! Firestore is fresh, clean, and ready.');
  process.exit(0);
}

main().catch(err => {
  console.error('Execution failed:', err);
  process.exit(1);
});
