import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzRngBbi5_Vz6-agGqGA_vRhU6-KNVdH4",
  authDomain: "kampusfilterapp.firebaseapp.com",
  projectId: "kampusfilterapp",
  storageBucket: "kampusfilterapp.firebasestorage.app",
  messagingSenderId: "939023631977",
  appId: "1:939023631977:web:79e79f1fdc1d6d89a504f8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Candidate collection names that might have been used previously
const possibleCollections = [
  'leads',
  'contact_leads',
  'visitor_leads',
  'contacts',
  'contact',
  'inquiries',
  'messages',
  'users',
  'subscribers',
  'counseling_requests'
];

async function main() {
  console.log('Inspecting collections in project kampusfilterapp...');
  
  for (const colName of possibleCollections) {
    try {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      console.log(`Collection '${colName}': ${snapshot.size} document(s)`);
      if (snapshot.size > 0) {
        for (const d of snapshot.docs) {
          console.log(`  Deleting doc ID: ${d.id}...`);
          await deleteDoc(doc(db, colName, d.id));
        }
        console.log(`  Cleaned collection '${colName}'.`);
      }
    } catch (err) {
      console.log(`  Note on '${colName}': ${err.message}`);
    }
  }

  console.log('\nInitializing fresh clean collections for Kampus Filter...');
  
  // Create an initial sample test lead in 'contact_leads'
  try {
    const contactRef = await addDoc(collection(db, 'contact_leads'), {
      name: 'Advisory Desk (System Init)',
      email: 'admissions@kampusfilter.com',
      phone: '+91 98765 00000',
      inquiryType: 'System Initialization',
      targetCourse: 'All Courses',
      message: 'Initial clean collection setup for Kampus Filter lead management.',
      source: 'system_init',
      status: 'active',
      createdAt: serverTimestamp(),
      clientTimestamp: new Date().toISOString()
    });
    console.log(`[+] Initialized 'contact_leads' with seed doc ID: ${contactRef.id}`);
  } catch (err) {
    console.error(`[-] Error seeding 'contact_leads':`, err);
  }

  // Create an initial sample test lead in 'visitor_leads'
  try {
    const visitorRef = await addDoc(collection(db, 'visitor_leads'), {
      name: 'Student Demo (System Init)',
      phone: '+91 98765 11111',
      email: 'student@example.com',
      targetCourse: 'B.Tech',
      preferredLocation: 'Delhi NCR',
      budgetRange: '₹5L - ₹10L',
      source: 'system_init',
      status: 'active',
      createdAt: serverTimestamp(),
      clientTimestamp: new Date().toISOString()
    });
    console.log(`[+] Initialized 'visitor_leads' with seed doc ID: ${visitorRef.id}`);
  } catch (err) {
    console.error(`[-] Error seeding 'visitor_leads':`, err);
  }

  console.log('\nFirestore setup completed successfully!');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
