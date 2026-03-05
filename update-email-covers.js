const fs = require('fs');
const path = require('path');

const emailDir = path.join(__dirname, 'email-kit');
const files = fs.readdirSync(emailDir).filter(f => f.endsWith('.html') && !f.includes('worker'));

let updated = 0;
for (const file of files) {
  const lang = file.replace('.html', ''); // e.g., "es", "zh-CN"
  const filePath = path.join(emailDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace the generic English cover with the language-specific cover
  const oldSrc = 'https://tradebladehq.com/assets/ebook-cover.png';
  const newSrc = `https://tradebladehq.com/assets/covers/cover-${lang}.jpg`;

  if (html.includes(oldSrc)) {
    html = html.replace(oldSrc, newSrc);
    fs.writeFileSync(filePath, html);
    console.log(`  ✓ ${file} → cover-${lang}.jpg`);
    updated++;
  } else if (html.includes(`cover-${lang}.jpg`)) {
    console.log(`  SKIP ${file} — already uses localized cover`);
  } else {
    console.log(`  ⚠ ${file} — no cover image found to replace`);
  }
}

console.log(`\nDone! Updated ${updated} email templates.`);
