#!/usr/bin/env node
// Generate translated ebook PDFs using Puppeteer
// Usage: node generate-ebooks.js [langCode] (or no arg for all)

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const TEMPLATE = fs.readFileSync(path.join(__dirname, 'ebook-template.html'), 'utf8');
const LANG_DIR = path.join(__dirname, 'ebook-lang');
const OUT_DIR = path.join(__dirname, 'assets', 'lang');

const RTL = ['ar', 'he', 'ur', 'fa'];

async function generatePDF(langCode) {
  const jsonPath = path.join(LANG_DIR, `${langCode}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.log(`  SKIP ${langCode} — no ebook JSON found`);
    return;
  }
  const book = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const dir = RTL.includes(langCode) ? 'rtl' : 'ltr';

  // Build HTML content from structured book data
  let content = '';

  // Title page
  content += `<div class="page title-page">
    <h1>${book.title || 'The Mathematics of Survival'}</h1>
    <div class="subtitle">${book.subtitle || ''}</div>
    <div class="proof">${book.proof || ''}</div>
  </div>`;

  // Dedication
  if (book.dedication) {
    content += `<div class="page dedication">${book.dedication}</div>`;
  }

  // Quotes page
  if (book.quotes && book.quotes.length) {
    content += `<div class="page quote-page">`;
    for (const q of book.quotes) {
      content += `<blockquote>${q.text}</blockquote><div class="attribution">${q.attribution}</div>`;
    }
    content += `</div>`;
  }

  // Table of contents
  if (book.toc) {
    content += `<div class="page toc"><h2>${book.toc_title || 'Contents'}</h2>${book.toc}</div>`;
  }

  // Parts and chapters
  if (book.sections) {
    for (const section of book.sections) {
      if (section.type === 'part') {
        content += `<div class="page part-divider">
          <div class="part-num">${section.label || ''}</div>
          <div class="part-title">${section.title}</div>
        </div>`;
      } else if (section.type === 'chapter') {
        content += `<div class="page"><div class="header">${book.title || 'The Mathematics of Survival'}</div>`;
        content += `<h2>${section.title}</h2><div class="chapter-body">`;
        for (const p of (section.paragraphs || [])) {
          if (p.startsWith('<h3>')) content += p;
          else if (p.startsWith('<ul>') || p.startsWith('<div')) content += p;
          else content += `<p>${p}</p>`;
        }
        content += `</div></div>`;
      } else if (section.type === 'appendix') {
        content += `<div class="page"><div class="header">${book.title || 'The Mathematics of Survival'}</div>`;
        content += `<h2>${section.title}</h2><div class="appendix">`;
        for (const p of (section.paragraphs || [])) {
          content += `<p>${p}</p>`;
        }
        content += `</div></div>`;
      }
    }
  }

  // Footer
  content += `<div class="footer-url">tradebladehq.com</div>`;

  const html = TEMPLATE
    .replace('{{LANG}}', langCode)
    .replace('{{DIR}}', dir)
    .replace('{{CONTENT}}', content);

  // Write temp HTML
  const tmpHtml = path.join(OUT_DIR, `_tmp_${langCode}.html`);
  fs.writeFileSync(tmpHtml, html, 'utf8');

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('file:///' + tmpHtml.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  const outPath = path.join(OUT_DIR, `TheMathematicsOfSurvival_${langCode}.pdf`);
  await page.pdf({
    path: outPath,
    format: 'Letter',
    margin: { top: '1in', bottom: '1in', left: '1.2in', right: '1.2in' },
    printBackground: true,
    displayHeaderFooter: false
  });

  await browser.close();
  fs.unlinkSync(tmpHtml);
  console.log(`  OK ${langCode} → ${path.basename(outPath)}`);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  if (!fs.existsSync(LANG_DIR)) {
    console.log('No ebook-lang/ directory found. Create translated ebook JSONs first.');
    process.exit(1);
  }

  const target = process.argv[2];
  const files = fs.readdirSync(LANG_DIR).filter(f => f.endsWith('.json'));

  if (target) {
    await generatePDF(target);
  } else {
    console.log(`Generating ${files.length} ebook PDFs...`);
    for (const f of files) {
      const code = f.replace('.json', '');
      await generatePDF(code);
    }
  }
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
