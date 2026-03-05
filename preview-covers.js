const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function main() {
  const langs = ['en','es','fr','de','ru','zh-CN','ja','ko','ar','he','hi','pt','tr','th'];
  const langDir = path.join(__dirname, 'assets', 'lang');
  const outDir = path.join('C:', 'Users', 'Kevin', 'Desktop', 'cover-previews');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const lang of langs) {
    const pdfPath = path.join(langDir, `TheMathematicsOfSurvival_${lang}.pdf`);
    if (!fs.existsSync(pdfPath)) { console.log(`  SKIP ${lang}`); continue; }

    // Extract just the cover page as a single-page PDF
    const srcDoc = await PDFDocument.load(fs.readFileSync(pdfPath));
    const coverDoc = await PDFDocument.create();
    const [page] = await coverDoc.copyPages(srcDoc, [0]);
    coverDoc.addPage(page);
    const coverBytes = await coverDoc.save();
    const outPath = path.join(outDir, `cover_${lang}.pdf`);
    fs.writeFileSync(outPath, Buffer.from(coverBytes));
    console.log(`  ✓ ${lang} → ${outPath}`);
  }

  console.log(`\nDone! Open the folder: ${outDir}`);
}

main().catch(err => { console.error(err); process.exit(1); });
