import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://puwswmoppujuaronlaia.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1d3N3bW9wcHVqdWFyb25sYWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNjY3NDYsImV4cCI6MjEwNDk0Mjc0Nn0.2FZpNH5_j79K0MSl3NkBJ9IE9NZ2Wr5ddiXS0RQLGwo';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function parseFeeValue(str) {
  if (!str) return null;
  const clean = String(str).toLowerCase().trim();

  if (
    clean === 'n/a' ||
    clean === 'tbd' ||
    clean === 'free' ||
    clean === '0' ||
    clean === '₹0'
  ) {
    return { type: 'placeholder', raw: str, value: 0 };
  }

  // Check Lakh / Lakhs
  const lakhMatch = clean.match(/₹?\s*([\d.]+)\s*(?:lakh|lac|l)/i);
  if (lakhMatch) {
    const val = parseFloat(lakhMatch[1]) * 100000;
    return { type: 'numeric', raw: str, value: val };
  }

  // Check Crore
  const crMatch = clean.match(/₹?\s*([\d.]+)\s*(?:cr|crore)/i);
  if (crMatch) {
    const val = parseFloat(crMatch[1]) * 10000000;
    return { type: 'numeric', raw: str, value: val };
  }

  // Check Thousand / k
  const kMatch = clean.match(/₹?\s*([\d.]+)\s*(?:k|thousand)/i);
  if (kMatch) {
    const val = parseFloat(kMatch[1]) * 1000;
    return { type: 'numeric', raw: str, value: val };
  }

  // Check plain number with commas e.g. ₹1,20,000 or 120000
  const numMatch = clean.replace(/,/g, '').match(/₹?\s*(\d+)/);
  if (numMatch) {
    const val = parseInt(numMatch[1], 10);
    return { type: 'numeric', raw: str, value: val };
  }

  return { type: 'text', raw: str, value: null };
}

async function runFeeScan() {
  console.log('🚀 Starting Fee Anomaly Scanner across all articles in Supabase...');
  const pageSize = 500;
  let offset = 0;
  const allArticles = [];

  while (true) {
    const { data, error } = await supabase
      .from('articles')
      .select('id, slug, title, category, comparison_table')
      .range(offset, offset + pageSize - 1);

    if (error) {
      console.error('Error fetching batch at offset ' + offset + ':', error);
      break;
    }
    if (!data || data.length === 0) break;
    allArticles.push(...data);
    if (data.length < pageSize) break;
    offset += pageSize;
  }

  console.log(`📊 Total articles retrieved: ${allArticles.length}`);

  let articlesWithFeeTable = 0;
  let articlesWithoutFeeTable = 0;
  let verifiedRealisticFees = 0;
  const suspiciousLowFees = [];
  const suspiciousHighFees = [];
  const placeholderFees = [];

  for (const art of allArticles) {
    const compTable =
      art.comparison_table || art.content_json?.components?.comparison_table;

    if (!compTable || !compTable.headers || !compTable.rows) {
      articlesWithoutFeeTable++;
      continue;
    }

    // Find Fee Column Index
    const headers = compTable.headers.map((h) => String(h).toLowerCase());
    const feeColIndex = headers.findIndex(
      (h) => h.includes('fee') || h.includes('cost') || h.includes('tuition')
    );
    const durationColIndex = headers.findIndex(
      (h) => h.includes('duration') || h.includes('year')
    );

    if (feeColIndex === -1) {
      articlesWithoutFeeTable++;
      continue;
    }

    articlesWithFeeTable++;
    let hasRowAnomaly = false;

    for (const row of compTable.rows) {
      if (!Array.isArray(row) || row.length <= feeColIndex) continue;
      const rawFee = row[feeColIndex];
      const parsed = parseFeeValue(rawFee);

      if (!parsed) continue;

      if (parsed.type === 'placeholder' || parsed.value === 0) {
        placeholderFees.push({
          slug: art.slug,
          title: art.title,
          college: row[0] || 'Unknown',
          rawFee,
        });
        hasRowAnomaly = true;
      } else if (parsed.type === 'numeric') {
        const val = parsed.value;
        const durationText =
          durationColIndex !== -1 && row[durationColIndex]
            ? String(row[durationColIndex]).toLowerCase()
            : '';

        // Potential semester fee mislabeled as total 3/4-year fee
        if (val > 0 && val < 30000 && !art.title.toLowerCase().includes('government')) {
          suspiciousLowFees.push({
            slug: art.slug,
            title: art.title,
            college: row[0] || 'Unknown',
            fee: val,
            rawFee,
            duration: durationText,
            reason: 'Suspiciously low total fee (< ₹30,000 for private college, likely per semester)',
          });
          hasRowAnomaly = true;
        } else if (val > 4000000 && !art.title.toLowerCase().includes('abroad')) {
          suspiciousHighFees.push({
            slug: art.slug,
            title: art.title,
            college: row[0] || 'Unknown',
            fee: val,
            rawFee,
            duration: durationText,
            reason: 'High fee outlier (> ₹40 Lakhs for domestic program)',
          });
          hasRowAnomaly = true;
        }
      }
    }

    if (!hasRowAnomaly) {
      verifiedRealisticFees++;
    }
  }

  const report = {
    timestamp: new Date().toISOString(),
    totalArticles: allArticles.length,
    articlesWithFeeTable,
    articlesWithoutFeeTable,
    verifiedRealisticFees,
    anomalySummary: {
      placeholderCount: placeholderFees.length,
      suspiciousLowCount: suspiciousLowFees.length,
      suspiciousHighCount: suspiciousHighFees.length,
      totalFlagged:
        placeholderFees.length +
        suspiciousLowFees.length +
        suspiciousHighFees.length,
    },
    samplePlaceholder: placeholderFees.slice(0, 5),
    sampleLowAnomalies: suspiciousLowFees.slice(0, 5),
    sampleHighAnomalies: suspiciousHighFees.slice(0, 5),
  };

  const reportPath = path.join(process.cwd(), 'scripts', 'fee_audit_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n=========================================');
  console.log('✅ FEE ANOMALY SCAN COMPLETE');
  console.log('=========================================');
  console.log(`Total Articles Scanned:        ${allArticles.length}`);
  console.log(`Articles with Fee Tables:      ${articlesWithFeeTable} (${((articlesWithFeeTable/allArticles.length)*100).toFixed(1)}%)`);
  console.log(`Articles with Verified Fees:   ${verifiedRealisticFees} (${((verifiedRealisticFees/articlesWithFeeTable)*100).toFixed(1)}% of fee tables)`);
  console.log(`Articles Without Fee Tables:   ${articlesWithoutFeeTable} (Exam/FAQ guides)`);
  console.log(`\nAnomalies Detected:`);
  console.log(` - Suspicious Low Fees (<₹30k): ${suspiciousLowFees.length}`);
  console.log(` - High Fee Outliers (>₹40L):   ${suspiciousHighFees.length}`);
  console.log(` - Placeholder (N/A / TBD / 0): ${placeholderFees.length}`);
  console.log(`Full report saved to: ${reportPath}`);
}

runFeeScan();
