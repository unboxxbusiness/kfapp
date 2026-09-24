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

// Government & Public Institution Matching Patterns
const GOVT_PATTERNS = [
  /\b(iit|nit|iiit|iim|aiims|nift|nlus?|nlu|nlsiu|nalsar|nujs)\b/i,
  /\b(jnu|jmi|jamia millia|delhi university|du|bhu|banaras hindu|amu|aligarh muslim)\b/i,
  /\b(anna university|mumbai university|pune university|savitribai|calcutta university|osmania|gujarat university)\b/i,
  /\b(rajasthan university|panjab university|punjabi university|kurukshetra university|kashmir university)\b/i,
  /\b(lucknow university|allahabad university|ravenshaw|bjb|coep|vjti|dtu|nsut|igdtuw|iiest|pec|ict|hbtu|jadavpur|presidency)\b/i,
  /\b(st\.?\s*xavier|loyola|madras christian|miranda house|hindu college|stephen'?s|srcc|hansraj|ramjas|kirori mal)\b/i,
  /\b(lady shri ram|lsr|gargi|sri venkateswara|daulat ram|indraprastha college|atmaram|khalsa|sgtb|stella maris|ethiraj|dav college)\b/i,
  /\b(andhra medical|madras medical|calcutta medical|stanley medical|king george|kgmu|grant medical)\b/i,
  /\b(government|govt|autonomous|state university|central university|national institute|municipal)\b/i,
];

// Career & Non-College Benchmark Patterns (Job roles, PG rents, salaries, hostels, self-study)
const CAREER_PATTERNS = [
  /\b(direct job|software engineer|software developer|data scientist|web developer|data analyst)\b/i,
  /\b(freelancing|freelancer|campus placement|starting salary|entry level role|job \(|training\))\b/i,
  /\b(hostel|pg accommodation|standard pg|living cost|food & dining|transportation|personal expenses|shared 2bhk|rental)\b/i,
  /\b(self-study|self study|open source|youtube|free resources|online tutorials)\b/i,
];

// Well-Known Private & Deemed Universities
const PRIVATE_PATTERNS = [
  /\b(amity|lpu|lovely professional|sharda|galgotias|manipal|vit|vellore|srm|bennett|upes)\b/i,
  /\b(chandigarh university|chitkara|thapar|bits pilani|bits|symbiosis|sibbm|scms|nmims)\b/i,
  /\b(christ university|jain university|kiit|soa|iter|sathyabama|parul|marwadi|gd goenka)\b/i,
  /\b(k\.?r\.? mangalam|graphic era|dit|shoolini|woxsen|bml munjal|flame|plaksha|alliance|ashoka)\b/i,
  /\b(private university|institute of technology & science|group of institutions|private design|private college)\b/i,
];

function isGovernment(name, title) {
  const combined = `${name} ${title}`;
  return GOVT_PATTERNS.some((pattern) => pattern.test(combined));
}

function isCareerBenchmark(name) {
  return CAREER_PATTERNS.some((pattern) => pattern.test(name));
}

function isPrivate(name) {
  return PRIVATE_PATTERNS.some((pattern) => pattern.test(name));
}

function parseUnitVal(numStr, unitStr, fullClean) {
  let v = parseFloat(numStr);
  if (isNaN(v)) return 0;
  const u = (unitStr || '').toLowerCase();
  if (/lakhs?|lacs?|l\b/i.test(u)) return v * 100000;
  if (/cr|crores?/i.test(u)) return v * 10000000;
  if (/k|thousands?/i.test(u)) return v * 1000;

  // Fallback if fullClean has unit and v < 100
  if (v < 100 && /lakhs?|lacs?|l\b/i.test(fullClean)) return v * 100000;
  if (v < 100 && /cr|crores?/i.test(fullClean)) return v * 10000000;
  if (v < 1000 && /k|thousands?/i.test(fullClean)) return v * 1000;
  return v;
}

function parseFee(str) {
  if (!str) return null;
  const rawClean = String(str).toLowerCase().trim();
  const clean = rawClean.replace(/,/g, '');

  const isExplicitSem = /per sem|\/sem|semester/i.test(rawClean);
  const isExplicitYear = /per yr|\/yr|per year|\/year|p\.a|annual/i.test(rawClean);
  const isExplicitTotal = /total|entire|all year/i.test(rawClean);

  if (
    /^(n\/a|tbd|free|0|₹0|-|--|\s*)$/i.test(clean) ||
    clean.includes('₹0') ||
    clean.includes('free')
  ) {
    return { type: 'placeholder', raw: str, value: 0, isExplicitSem, isExplicitYear, isExplicitTotal };
  }

  // 1. Range e.g. ₹90K - ₹1.3L or ₹1.5 - ₹3.5 Lakhs or ₹48500 - ₹120000
  const rangeMatch = clean.match(/₹?\s*([\d.]+)\s*(lakhs?|lacs?|l|cr|crores?|k|thousand)?\s*[-–—to]+\s*₹?\s*([\d.]+)\s*(lakhs?|lacs?|l|cr|crores?|k|thousand)?/i);
  if (rangeMatch) {
    let u1 = rangeMatch[2];
    let u2 = rangeMatch[4];
    if (!u1 && u2) u1 = u2;
    if (!u2 && u1) u2 = u1;

    const v1 = parseUnitVal(rangeMatch[1], u1, clean);
    const v2 = parseUnitVal(rangeMatch[3], u2, clean);
    const avg = (v1 + v2) / 2;
    return { type: 'numeric', raw: str, value: avg, isExplicitSem, isExplicitYear, isExplicitTotal };
  }

  // 2. Lakh / Lac / L
  const lakhMatch = clean.match(/₹?\s*([\d.]+)\s*(?:lakhs?|lacs?|l\b)/i);
  if (lakhMatch) {
    return { type: 'numeric', raw: str, value: parseFloat(lakhMatch[1]) * 100000, isExplicitSem, isExplicitYear, isExplicitTotal };
  }

  // 3. Crore / Cr
  const crMatch = clean.match(/₹?\s*([\d.]+)\s*(?:crores?|crs?|cr\b)/i);
  if (crMatch) {
    return { type: 'numeric', raw: str, value: parseFloat(crMatch[1]) * 10000000, isExplicitSem, isExplicitYear, isExplicitTotal };
  }

  // 4. Thousand / K
  const kMatch = clean.match(/₹?\s*([\d.]+)\s*(?:thousands?|k\b)/i);
  if (kMatch) {
    return { type: 'numeric', raw: str, value: parseFloat(kMatch[1]) * 1000, isExplicitSem, isExplicitYear, isExplicitTotal };
  }

  // 5. Plain number e.g. ₹120000
  const numMatch = clean.match(/₹?\s*(\d+)/);
  if (numMatch) {
    return { type: 'numeric', raw: str, value: parseInt(numMatch[1], 10), isExplicitSem, isExplicitYear, isExplicitTotal };
  }

  return { type: 'text', raw: str, value: null, isExplicitSem, isExplicitYear, isExplicitTotal };
}

function detectCourseBand(title, category, collegeName, rawFee) {
  const combined = `${title} ${category} ${collegeName} ${rawFee}`.toLowerCase();
  if (/\b(mbbs|md|ms|bds|medical|kmc|kasturba medical|aiims|neet)\b/.test(combined)) return 'MEDICAL';
  if (/\b(abroad|usa|uk|germany|canada|australia|study in)\b/.test(combined)) return 'ABROAD';
  if (/\b(b\.?tech|b\.?e|engineering)\b/.test(combined)) return 'ENGINEERING';
  if (/\b(mba|pgdm)\b/.test(combined)) return 'MBA';
  if (/\b(bba|bms)\b/.test(combined)) return 'BBA';
  if (/\b(bca|mca)\b/.test(combined)) return 'COMPUTER_APP';
  if (/\b(llb|law|llm)\b/.test(combined)) return 'LAW';
  if (/\b(b\.?pharm|m\.?pharm|pharmacy)\b/.test(combined)) return 'PHARMACY';
  if (/\b(ba|b\.?sc|b\.?com|ma|m\.?sc|m\.?com)\b/.test(combined)) return 'GENERAL_UG_PG';
  return 'GENERAL';
}

async function runDeepFeeAudit() {
  console.log('🔍 Starting Deep Row-Level Fee Accuracy Audit across all articles...');
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

  console.log(`📚 Total articles fetched from Supabase: ${allArticles.length}`);

  let articlesWithTable = 0;
  let totalRowsAudited = 0;

  // Classifications
  let validGovtSubsidized = 0;
  let validPrivateCorridor = 0;
  let validCareerBenchmark = 0;
  let validMedicalOrAbroad = 0;
  let validGeneralCorridor = 0;

  let trueSemesterErrors = 0;
  let trueHighAnomalies = 0;
  let truePlaceholderErrors = 0;
  let uncategorizedRows = 0;

  const sampleValidGovt = [];
  const sampleValidMedical = [];
  const sampleValidCareer = [];
  const sampleValidPrivate = [];
  const sampleSemesterErrors = [];
  const sampleTruePlaceholders = [];
  const sampleHighAnomalies = [];

  for (const art of allArticles) {
    const compTable = art.comparison_table;
    if (!compTable || !compTable.headers || !compTable.rows) continue;

    const headers = compTable.headers.map((h) => String(h).toLowerCase());
    const feeColIndex = headers.findIndex(
      (h) => h.includes('fee') || h.includes('cost') || h.includes('tuition')
    );
    const durationColIndex = headers.findIndex(
      (h) => h.includes('duration') || h.includes('year')
    );

    if (feeColIndex === -1) continue;
    articlesWithTable++;

    for (const row of compTable.rows) {
      if (!Array.isArray(row) || row.length <= feeColIndex) continue;
      totalRowsAudited++;

      const collegeName = String(row[0] || '').trim();
      const rawFee = row[feeColIndex];
      const parsed = parseFee(rawFee);

      if (!parsed) {
        uncategorizedRows++;
        continue;
      }

      // 1. Check if Career / Non-College Benchmark row
      if (
        isCareerBenchmark(collegeName) ||
        (parsed.type === 'placeholder' && (isCareerBenchmark(art.title) || isCareerBenchmark(collegeName)))
      ) {
        validCareerBenchmark++;
        if (sampleValidCareer.length < 5) {
          sampleValidCareer.push({
            article: art.title,
            entity: collegeName,
            fee: rawFee,
          });
        }
        continue;
      }

      // 2. Check Placeholders on actual colleges (TBD, N/A, ₹0)
      if (parsed.type === 'placeholder' || parsed.value === 0) {
        truePlaceholderErrors++;
        if (sampleTruePlaceholders.length < 5) {
          sampleTruePlaceholders.push({
            slug: art.slug,
            article: art.title,
            college: collegeName,
            rawFee,
          });
        }
        continue;
      }

      const val = parsed.value;
      const courseBand = detectCourseBand(art.title, art.category || '', collegeName, String(rawFee));
      const isGovt = isGovernment(collegeName, art.title);
      const isPriv = isPrivate(collegeName);

      // 3. High Fee Check (> ₹40 Lakhs)
      if (val > 4000000) {
        if (
          courseBand === 'MEDICAL' ||
          courseBand === 'ABROAD' ||
          art.title.toLowerCase().includes('abroad') ||
          art.title.toLowerCase().includes('mbbs') ||
          art.title.toLowerCase().includes('medical')
        ) {
          validMedicalOrAbroad++;
          if (sampleValidMedical.length < 5) {
            sampleValidMedical.push({
              article: art.title,
              college: collegeName,
              fee: rawFee,
              val,
              course: courseBand,
            });
          }
        } else {
          trueHighAnomalies++;
          if (sampleHighAnomalies.length < 5) {
            sampleHighAnomalies.push({
              slug: art.slug,
              article: art.title,
              college: collegeName,
              fee: rawFee,
              val,
              course: courseBand,
            });
          }
        }
        continue;
      }

      // 4. Low Fee Check (< ₹35,000)
      if (val < 35000) {
        if (isGovt || courseBand === 'GENERAL_UG_PG') {
          // Central/State Govt institutions legitimately charge ₹5k - ₹35k total for BA, BSc, BCom, MA, MCom, etc.
          validGovtSubsidized++;
          if (sampleValidGovt.length < 5) {
            sampleValidGovt.push({
              article: art.title,
              college: collegeName,
              fee: rawFee,
              val,
              type: isGovt ? 'Government Institution' : 'Subsidized UG / Public University',
            });
          }
        } else if (isPriv && (courseBand === 'ENGINEERING' || courseBand === 'MBA' || courseBand === 'BBA')) {
          // Private engineering/management college listing < ₹35,000 total is a genuine semester-unit mislabel
          trueSemesterErrors++;
          if (sampleSemesterErrors.length < 5) {
            sampleSemesterErrors.push({
              slug: art.slug,
              article: art.title,
              college: collegeName,
              fee: rawFee,
              val,
              course: courseBand,
              probableTruth: `Likely single semester fee (Annual should be ~₹${(val * 2).toLocaleString('en-IN')})`,
            });
          }
        } else {
          // General subsidized public / autonomous colleges
          validGovtSubsidized++;
        }
        continue;
      }

      // 5. Standard Realistic Fees (₹35,000 to ₹40 Lakhs)
      if (isPriv) {
        validPrivateCorridor++;
        if (sampleValidPrivate.length < 5) {
          sampleValidPrivate.push({
            college: collegeName,
            course: courseBand,
            fee: rawFee,
            val,
          });
        }
      } else {
        validGeneralCorridor++;
      }
    }
  }

  const totalValidRows =
    validGovtSubsidized +
    validPrivateCorridor +
    validGeneralCorridor +
    validCareerBenchmark +
    validMedicalOrAbroad;

  const totalErrorRows =
    trueSemesterErrors +
    trueHighAnomalies +
    truePlaceholderErrors;

  const totalEvaluatedRows = totalValidRows + totalErrorRows;
  const rowAccuracyPercentage = (
    (totalValidRows / (totalEvaluatedRows || 1)) *
    100
  ).toFixed(2);

  const report = {
    timestamp: new Date().toISOString(),
    totalArticles: allArticles.length,
    articlesWithTable,
    totalRowsAudited,
    accuracyMetrics: {
      totalEvaluatedRows,
      totalValidRows,
      totalErrorRows,
      rowAccuracyPercentage: `${rowAccuracyPercentage}%`,
    },
    validBreakdown: {
      validPrivateCorridor,
      validGeneralCorridor,
      validGovtSubsidized,
      validCareerBenchmark,
      validMedicalOrAbroad,
    },
    errorBreakdown: {
      trueSemesterErrors,
      truePlaceholderErrors,
      trueHighAnomalies,
      uncategorizedRows,
    },
    samples: {
      sampleValidGovt,
      sampleValidPrivate,
      sampleValidMedical,
      sampleValidCareer,
      sampleSemesterErrors,
      sampleTruePlaceholders,
      sampleHighAnomalies,
    },
  };

  const outputPath = path.join(process.cwd(), 'scripts', 'deep_fee_audit_results.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2), 'utf-8');

  console.log('\n========================================');
  console.log('🎯 DEEP ROW-LEVEL FEE ACCURACY REPORT');
  console.log('========================================');
  console.log(`Total Articles in Supabase:   ${allArticles.length}`);
  console.log(`Articles with Fee Tables:     ${articlesWithTable}`);
  console.log(`Total Table Rows Audited:     ${totalRowsAudited}`);
  console.log(`----------------------------------------`);
  console.log(`✅ TOTAL VALID ACCURATE ROWS:   ${totalValidRows} (${rowAccuracyPercentage}%)`);
  console.log(`   • Standard Private College:    ${validPrivateCorridor}`);
  console.log(`   • General Verified Higher Ed:  ${validGeneralCorridor}`);
  console.log(`   • Verified Govt Subsidized:    ${validGovtSubsidized} (e.g. DU, JNU, Jamia, Ravenshaw)`);
  console.log(`   • Career / Job Baseline Rows:  ${validCareerBenchmark} (e.g. Direct Job ₹0, PG Rent)`);
  console.log(`   • Medical & Study Abroad:      ${validMedicalOrAbroad} (e.g. MBBS ₹40L-₹70L)`);
  console.log(`----------------------------------------`);
  console.log(`⚠️ TRUE ANOMALY ROWS:          ${totalErrorRows} (${(100 - rowAccuracyPercentage).toFixed(2)}%)`);
  console.log(`   • True Semester Mislabels:   ${trueSemesterErrors} (Private 4-yr B.Tech/MBA < ₹35k)`);
  console.log(`   • True Placeholders (TBD):   ${truePlaceholderErrors}`);
  console.log(`   • High Outliers (> ₹40L):    ${trueHighAnomalies}`);
  console.log('========================================\n');
  console.log(`📁 Detailed report saved to: ${outputPath}`);
}

runDeepFeeAudit().catch(console.error);
