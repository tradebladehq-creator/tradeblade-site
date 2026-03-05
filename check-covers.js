const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function main() {
  const langDir = path.join(__dirname, 'assets', 'lang');
  const files = fs.readdirSync(langDir).filter(f => f.startsWith('TheMathematicsOfSurvival_') && f.endsWith('.pdf'));

  for (const file of files.sort()) {
    const lang = file.replace('TheMathematicsOfSurvival_', '').replace('.pdf', '');
    const pdfPath = path.join(langDir, file);
    const doc = await PDFDocument.load(fs.readFileSync(pdfPath));
    const page = doc.getPage(0); // Cover page
    const { width, height } = page.getSize();
    const pageCount = doc.getPageCount();

    // Extract text from cover page
    // pdf-lib doesn't extract text well, so let's check page dimensions
    // Cover pages from Puppeteer are 1024x1536, content pages are different
    console.log(`${lang.padEnd(6)} | pages: ${String(pageCount).padStart(2)} | cover size: ${width.toFixed(0)}x${height.toFixed(0)} | file: ${(fs.statSync(pdfPath).size/1024).toFixed(0)} KB`);
  }
}

main().catch(console.error);
