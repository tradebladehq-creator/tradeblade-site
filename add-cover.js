const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function main() {
  const langDir = path.join(__dirname, 'assets', 'lang');
  const englishPdf = path.join(__dirname, 'assets', 'TheMathematicsOfSurvival.pdf');

  // Load the English PDF and extract its cover page (page 0)
  const englishBytes = fs.readFileSync(englishPdf);
  const englishDoc = await PDFDocument.load(englishBytes);
  const totalEnPages = englishDoc.getPageCount();
  console.log(`English PDF: ${totalEnPages} pages, ${englishBytes.length} bytes`);

  // Get all translated PDF files
  const files = fs.readdirSync(langDir).filter(f => f.startsWith('TheMathematicsOfSurvival_') && f.endsWith('.pdf'));
  console.log(`Found ${files.length} translated PDFs\n`);

  let fixed = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(langDir, file);
    const langBytes = fs.readFileSync(filePath);
    const langDoc = await PDFDocument.load(langBytes);
    const langPages = langDoc.getPageCount();

    // Check if the first page already has the cover dimensions
    // The English cover is a full image page - detect by checking if
    // the translated PDF has fewer pages than English
    // Or simply: always prepend the cover since we know all translated PDFs lack it

    console.log(`${file}: ${langPages} pages, ${langBytes.length} bytes`);

    // Create a new document with the English cover + translated content
    const newDoc = await PDFDocument.create();

    // Copy cover page from English PDF (page 0)
    const [coverPage] = await newDoc.copyPages(englishDoc, [0]);
    newDoc.addPage(coverPage);

    // Copy all pages from the translated PDF
    const langPageIndices = Array.from({ length: langPages }, (_, i) => i);
    const copiedPages = await newDoc.copyPages(langDoc, langPageIndices);
    for (const page of copiedPages) {
      newDoc.addPage(page);
    }

    // Save the merged PDF
    const newBytes = await newDoc.save();
    fs.writeFileSync(filePath, Buffer.from(newBytes));

    console.log(`  -> Fixed: ${newDoc.getPageCount()} pages, ${newBytes.length} bytes\n`);
    fixed++;
  }

  console.log(`\nDone! Fixed ${fixed} PDFs, skipped ${skipped}`);
}

main().catch(err => { console.error(err); process.exit(1); });
