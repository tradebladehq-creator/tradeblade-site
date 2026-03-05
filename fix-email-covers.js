const fs = require('fs');
const path = require('path');

const emailDir = path.join(__dirname, 'email-kit');
const files = fs.readdirSync(emailDir).filter(f => f.endsWith('.html') && !f.includes('worker'));

// Cover image row to insert after the header
const coverImgRow = `
  <!-- Book Cover -->
  <tr><td style="padding:24px 40px 0;text-align:center;">
    <img src="https://tradebladehq.com/assets/ebook-cover.png" width="240" alt="The Mathematics of Survival"
         style="display:block;margin:0 auto;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.4);" />
  </td></tr>`;

let updated = 0;
for (const file of files) {
  const filePath = path.join(emailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Check if cover already added
  if (html.includes('Book Cover')) {
    console.log(`  SKIP ${file} — already has cover`);
    continue;
  }

  // Insert after the header row (after the first </td></tr> inside the inner table)
  // The header ends with: </p>\n  </td></tr>
  // Insert right after that first </td></tr> in the inner table
  const headerEndPattern = /(<\/p>\s*<\/td><\/tr>)/;
  const match = html.match(headerEndPattern);
  if (match) {
    const insertPos = html.indexOf(match[0]) + match[0].length;
    html = html.slice(0, insertPos) + '\n' + coverImgRow + html.slice(insertPos);
    fs.writeFileSync(filePath, html);
    console.log(`  ✓ ${file}`);
    updated++;
  } else {
    console.log(`  ⚠ ${file} — could not find header end pattern`);
  }
}

console.log(`\nDone! Updated ${updated} email templates.`);
