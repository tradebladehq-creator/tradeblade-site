const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// ─── TRANSLATIONS ───
// Each language: prefix (THE), main1 (MATHEMATICS), connector (of), main2 (SURVIVAL),
//                subtitle, tagline
const T = {
  'en': {
    prefix: 'THE', main1: 'MATHEMATICS', connector: 'of', main2: 'SURVIVAL',
    subtitle: 'Why Most Traders Fail and the Only Path Forward',
    tagline: 'A Mathematical Proof That Knowing Is Not Enough'
  },
  'es': {
    prefix: 'LAS', main1: 'MATEMÁTICAS', connector: 'de la', main2: 'SUPERVIVENCIA',
    subtitle: 'Por qué la mayoría de los traders fracasan y el único camino a seguir',
    tagline: 'Una prueba matemática de que saber no es suficiente'
  },
  'fr': {
    prefix: 'LES', main1: 'MATHÉMATIQUES', connector: 'de la', main2: 'SURVIE',
    subtitle: 'Pourquoi la plupart des traders échouent et la seule voie possible',
    tagline: 'Une preuve mathématique que savoir ne suffit pas'
  },
  'de': {
    prefix: 'DIE', main1: 'MATHEMATIK', connector: 'des', main2: 'ÜBERLEBENS',
    subtitle: 'Warum die meisten Trader scheitern und der einzige Weg nach vorn',
    tagline: 'Ein mathematischer Beweis, dass Wissen nicht genug ist'
  },
  'pt': {
    prefix: 'A', main1: 'MATEMÁTICA', connector: 'da', main2: 'SOBREVIVÊNCIA',
    subtitle: 'Por que a maioria dos traders falha e o único caminho a seguir',
    tagline: 'Uma prova matemática de que saber não é suficiente'
  },
  'it': {
    prefix: 'LA', main1: 'MATEMATICA', connector: 'della', main2: 'SOPRAVVIVENZA',
    subtitle: 'Perché la maggior parte dei trader fallisce e l\'unica via da seguire',
    tagline: 'Una prova matematica che sapere non è abbastanza'
  },
  'nl': {
    prefix: 'DE', main1: 'WISKUNDE', connector: 'van', main2: 'OVERLEVEN',
    subtitle: 'Waarom de meeste traders falen en de enige weg vooruit',
    tagline: 'Een wiskundig bewijs dat kennis niet genoeg is'
  },
  'ru': {
    prefix: '', main1: 'МАТЕМАТИКА', connector: '', main2: 'ВЫЖИВАНИЯ',
    subtitle: 'Почему большинство трейдеров терпят неудачу и единственный путь вперёд',
    tagline: 'Математическое доказательство того, что знания недостаточно'
  },
  'pl': {
    prefix: '', main1: 'MATEMATYKA', connector: '', main2: 'PRZETRWANIA',
    subtitle: 'Dlaczego większość traderów ponosi porażkę i jedyna droga naprzód',
    tagline: 'Matematyczny dowód, że wiedza to za mało'
  },
  'cs': {
    prefix: '', main1: 'MATEMATIKA', connector: '', main2: 'PŘEŽITÍ',
    subtitle: 'Proč většina obchodníků selhává a jediná cesta vpřed',
    tagline: 'Matematický důkaz, že vědět nestačí'
  },
  'tr': {
    prefix: '', main1: 'MATEMATİĞİ', connector: '', main2: 'HAYATTA KALMANIN',
    subtitle: 'Neden çoğu trader başarısız olur ve ileriye giden tek yol',
    tagline: 'Bilmenin yeterli olmadığının matematiksel kanıtı'
  },
  'ar': {
    prefix: '', main1: 'رياضيات', connector: '', main2: 'البقاء',
    subtitle: 'لماذا يفشل معظم المتداولين والطريق الوحيد للمضي قدماً',
    tagline: 'برهان رياضي على أن المعرفة وحدها لا تكفي',
    rtl: true
  },
  'he': {
    prefix: '', main1: 'המתמטיקה', connector: 'של', main2: 'ההישרדות',
    subtitle: 'למה רוב הסוחרים נכשלים והדרך היחידה קדימה',
    tagline: 'הוכחה מתמטית שידע לבד אינו מספיק',
    rtl: true
  },
  'ur': {
    prefix: '', main1: 'ریاضی', connector: '', main2: 'بقا کی',
    subtitle: 'زیادہ تر ٹریڈرز کیوں ناکام ہوتے ہیں اور آگے بڑھنے کا واحد راستہ',
    tagline: 'ایک ریاضیاتی ثبوت کہ صرف جاننا کافی نہیں',
    rtl: true
  },
  'fa': {
    prefix: '', main1: 'ریاضیات', connector: '', main2: 'بقا',
    subtitle: 'چرا بیشتر معامله‌گران شکست می‌خورند و تنها مسیر پیش رو',
    tagline: 'یک اثبات ریاضی که دانستن به تنهایی کافی نیست',
    rtl: true
  },
  'hi': {
    prefix: '', main1: 'गणित', connector: '', main2: 'जीवित रहने का',
    subtitle: 'अधिकांश ट्रेडर क्यों विफल होते हैं और आगे बढ़ने का एकमात्र रास्ता',
    tagline: 'एक गणितीय प्रमाण कि केवल जानना पर्याप्त नहीं है'
  },
  'bn': {
    prefix: '', main1: 'গণিত', connector: '', main2: 'টিকে থাকার',
    subtitle: 'কেন বেশিরভাগ ট্রেডার ব্যর্থ হয় এবং একমাত্র সামনের পথ',
    tagline: 'একটি গাণিতিক প্রমাণ যে শুধু জানাই যথেষ্ট নয়'
  },
  'th': {
    prefix: '', main1: 'คณิตศาสตร์', connector: 'แห่ง', main2: 'การอยู่รอด',
    subtitle: 'ทำไมเทรดเดอร์ส่วนใหญ่ล้มเหลว และเส้นทางเดียวที่เป็นไปได้',
    tagline: 'การพิสูจน์ทางคณิตศาสตร์ว่าการรู้เพียงอย่างเดียวไม่เพียงพอ'
  },
  'vi': {
    prefix: '', main1: 'TOÁN HỌC', connector: 'của', main2: 'SỰ SINH TỒN',
    subtitle: 'Tại sao hầu hết các nhà giao dịch thất bại và con đường duy nhất phía trước',
    tagline: 'Một chứng minh toán học rằng biết thôi chưa đủ'
  },
  'id': {
    prefix: '', main1: 'MATEMATIKA', connector: '', main2: 'BERTAHAN HIDUP',
    subtitle: 'Mengapa sebagian besar trader gagal dan satu-satunya jalan ke depan',
    tagline: 'Bukti matematis bahwa mengetahui saja tidak cukup'
  },
  'ms': {
    prefix: '', main1: 'MATEMATIK', connector: '', main2: 'KELANGSUNGAN HIDUP',
    subtitle: 'Mengapa kebanyakan pedagang gagal dan satu-satunya jalan ke hadapan',
    tagline: 'Bukti matematik bahawa mengetahui sahaja tidak mencukupi'
  },
  'tl': {
    prefix: 'ANG', main1: 'MATEMATIKA', connector: 'ng', main2: 'KALIGTASAN',
    subtitle: 'Bakit nabibigo ang karamihan ng mga trader at ang tanging landas pasulong',
    tagline: 'Isang matematikal na patunay na ang kaalaman lamang ay hindi sapat'
  },
  'zh-CN': {
    prefix: '', main1: '生存的', connector: '', main2: '数学',
    subtitle: '为什么大多数交易者失败以及唯一的前进之路',
    tagline: '一个数学证明：仅仅知道是不够的'
  },
  'zh-TW': {
    prefix: '', main1: '生存的', connector: '', main2: '數學',
    subtitle: '為什麼大多數交易者失敗以及唯一的前進之路',
    tagline: '一個數學證明：僅僅知道是不夠的'
  },
  'ja': {
    prefix: '', main1: '生存の', connector: '', main2: '数学',
    subtitle: 'なぜほとんどのトレーダーが失敗し、唯一の道は何か',
    tagline: '知っているだけでは十分でないことの数学的証明'
  },
  'ko': {
    prefix: '', main1: '생존의', connector: '', main2: '수학',
    subtitle: '대부분의 트레이더가 실패하는 이유와 유일한 앞으로의 길',
    tagline: '아는 것만으로는 충분하지 않다는 수학적 증명'
  },
  'sv': {
    prefix: '', main1: 'MATEMATIKEN', connector: 'för', main2: 'ÖVERLEVNAD',
    subtitle: 'Varför de flesta handlare misslyckas och den enda vägen framåt',
    tagline: 'Ett matematiskt bevis att kunskap inte räcker'
  },
  'no': {
    prefix: '', main1: 'MATEMATIKKEN', connector: 'for', main2: 'OVERLEVELSE',
    subtitle: 'Hvorfor de fleste tradere mislykkes og den eneste veien fremover',
    tagline: 'Et matematisk bevis på at kunnskap ikke er nok'
  },
  'da': {
    prefix: '', main1: 'MATEMATIKKEN', connector: 'for', main2: 'OVERLEVELSE',
    subtitle: 'Hvorfor de fleste tradere fejler og den eneste vej fremad',
    tagline: 'Et matematisk bevis for at viden ikke er nok'
  },
  'fi': {
    prefix: '', main1: 'MATEMATIIKKA', connector: '', main2: 'SELVIYTYMISEN',
    subtitle: 'Miksi useimmat kauppiaat epäonnistuvat ja ainoa tie eteenpäin',
    tagline: 'Matemaattinen todiste siitä, että pelkkä tietäminen ei riitä'
  },
  'el': {
    prefix: 'ΤΑ', main1: 'ΜΑΘΗΜΑΤΙΚΑ', connector: 'της', main2: 'ΕΠΙΒΙΩΣΗΣ',
    subtitle: 'Γιατί οι περισσότεροι traders αποτυγχάνουν και ο μοναδικός δρόμος μπροστά',
    tagline: 'Μια μαθηματική απόδειξη ότι η γνώση δεν αρκεί'
  },
  'ro': {
    prefix: '', main1: 'MATEMATICA', connector: '', main2: 'SUPRAVIEȚUIRII',
    subtitle: 'De ce majoritatea traderilor eșuează și singura cale înainte',
    tagline: 'O dovadă matematică că a ști nu este suficient'
  },
  'hu': {
    prefix: 'A', main1: 'TÚLÉLÉS', connector: '', main2: 'MATEMATIKÁJA',
    subtitle: 'Miért bukik el a legtöbb kereskedő és az egyetlen út előre',
    tagline: 'Matematikai bizonyíték arra, hogy a tudás önmagában nem elég'
  },
  'uk': {
    prefix: '', main1: 'МАТЕМАТИКА', connector: '', main2: 'ВИЖИВАННЯ',
    subtitle: 'Чому більшість трейдерів зазнають невдачі та єдиний шлях вперед',
    tagline: 'Математичний доказ того, що знання недостатньо'
  },
  'hr': {
    prefix: '', main1: 'MATEMATIKA', connector: '', main2: 'PREŽIVLJAVANJA',
    subtitle: 'Zašto većina trgovaca propada i jedini put naprijed',
    tagline: 'Matematički dokaz da samo znanje nije dovoljno'
  },
  'bg': {
    prefix: '', main1: 'МАТЕМАТИКАТА', connector: 'на', main2: 'ОЦЕЛЯВАНЕТО',
    subtitle: 'Защо повечето трейдъри се провалят и единственият път напред',
    tagline: 'Математическо доказателство, че знанието не е достатъчно'
  }
};

// ─── HTML TEMPLATE ───
function buildCoverHTML(lang, t, bgDataUri) {
  const isRTL = t.rtl || false;
  const dir = isRTL ? 'rtl' : 'ltr';

  // For CJK/complex scripts: use appropriate font families
  let fontFamily = "'Playfair Display', 'Georgia', 'Times New Roman', serif";
  let subtitleFamily = "'Cormorant Garamond', 'Georgia', serif";
  if (['zh-CN', 'zh-TW', 'ja'].includes(lang)) {
    fontFamily = "'Noto Serif CJK SC', 'Noto Serif SC', 'SimSun', 'MS Mincho', serif";
    subtitleFamily = fontFamily;
  } else if (lang === 'ko') {
    fontFamily = "'Noto Serif KR', 'Batang', serif";
    subtitleFamily = fontFamily;
  } else if (['ar', 'ur', 'fa'].includes(lang)) {
    fontFamily = "'Noto Naskh Arabic', 'Traditional Arabic', 'Amiri', serif";
    subtitleFamily = fontFamily;
  } else if (lang === 'he') {
    fontFamily = "'Noto Serif Hebrew', 'David', serif";
    subtitleFamily = fontFamily;
  } else if (['hi', 'bn'].includes(lang)) {
    fontFamily = "'Noto Serif Devanagari', 'Mangal', serif";
    subtitleFamily = fontFamily;
  } else if (lang === 'th') {
    fontFamily = "'Noto Serif Thai', 'Sarabun', serif";
    subtitleFamily = fontFamily;
  } else if (lang === 'el') {
    fontFamily = "'Playfair Display', 'Noto Serif', serif";
    subtitleFamily = "'Cormorant Garamond', 'Noto Serif', serif";
  }

  // Adjust main font sizes for long words
  const m1Len = t.main1.length;
  const m2Len = t.main2.length;
  const maxLen = Math.max(m1Len, m2Len);
  let mainFontSize = '72px';
  if (maxLen > 14) mainFontSize = '54px';
  else if (maxLen > 11) mainFontSize = '60px';
  else if (maxLen > 9) mainFontSize = '66px';

  // CJK gets different sizing
  if (['zh-CN', 'zh-TW', 'ja', 'ko'].includes(lang)) {
    mainFontSize = '80px';
  }

  // bgDataUri passed as parameter

  return `<!DOCTYPE html>
<html dir="${dir}">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet">
<style>
  @page { margin: 0; size: 1024px 1536px; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1024px;
    height: 1536px;
    background: url('${bgDataUri}') center/cover no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-family: ${fontFamily};
    direction: ${dir};
    overflow: hidden;
  }
  .text-container {
    margin-top: 100px;
    text-align: center;
    width: 90%;
    text-shadow: 0 2px 12px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5);
  }
  .prefix {
    font-family: ${fontFamily};
    font-size: 42px;
    font-weight: 700;
    color: #d4a84b;
    letter-spacing: 8px;
    margin-bottom: 4px;
    min-height: 10px;
  }
  .main1 {
    font-family: ${fontFamily};
    font-size: ${mainFontSize};
    font-weight: 900;
    color: #d4a84b;
    letter-spacing: 3px;
    line-height: 1.05;
    margin-bottom: 2px;
  }
  .connector {
    font-family: ${fontFamily};
    font-size: 36px;
    font-weight: 400;
    color: #c9a44e;
    letter-spacing: 4px;
    margin-bottom: 2px;
    min-height: 10px;
  }
  .main2 {
    font-family: ${fontFamily};
    font-size: ${mainFontSize};
    font-weight: 900;
    color: #d4a84b;
    letter-spacing: 3px;
    line-height: 1.05;
    margin-bottom: 30px;
  }
  .divider {
    width: 60px;
    height: 2px;
    background: #c9a44e88;
    margin: 0 auto 24px auto;
  }
  .subtitle {
    font-family: ${subtitleFamily};
    font-size: 28px;
    font-weight: 400;
    font-style: italic;
    color: #d4c08a;
    line-height: 1.4;
    margin-bottom: 16px;
    padding: 0 40px;
  }
  .tagline {
    font-family: ${subtitleFamily};
    font-size: 22px;
    font-weight: 400;
    font-style: italic;
    color: #b8a878;
    line-height: 1.4;
    padding: 0 60px;
  }
</style>
</head>
<body>
  <div class="text-container">
    <div class="prefix">${t.prefix || ''}</div>
    <div class="main1">${t.main1}</div>
    <div class="connector">${t.connector || ''}</div>
    <div class="main2">${t.main2}</div>
    <div class="divider"></div>
    <div class="subtitle">${t.subtitle}</div>
    <div class="tagline">${t.tagline}</div>
  </div>
</body>
</html>`;
}

// ─── MAIN ───
async function main() {
  const langDir = path.join(__dirname, 'assets', 'lang');
  const outDir = path.join(__dirname, 'assets', 'covers');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Read background image once as base64
  const bgImagePath = path.join('C:', 'Users', 'Kevin', 'Desktop', 'MasterScope', 'Text-Free-Master-Cover.png');
  const bgBase64 = fs.readFileSync(bgImagePath).toString('base64');
  const bgDataUri = `data:image/png;base64,${bgBase64}`;
  console.log('Background image loaded (' + Math.round(bgBase64.length / 1024) + ' KB base64)');

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--no-sandbox']
  });

  const langs = Object.keys(T);
  console.log(`Generating covers for ${langs.length} languages...\n`);

  for (const lang of langs) {
    const t = T[lang];
    const html = buildCoverHTML(lang, t, bgDataUri);

    // Write temp HTML
    const tmpHtml = path.join(outDir, `cover_${lang}.html`);
    fs.writeFileSync(tmpHtml, html);

    // Render to PDF
    const page = await browser.newPage();
    await page.goto(`file:///${tmpHtml.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 15000 });

    const coverPdfPath = path.join(outDir, `cover_${lang}.pdf`);
    await page.pdf({
      path: coverPdfPath,
      width: '1024px',
      height: '1536px',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    await page.close();

    // Now merge: cover PDF + translated PDF content
    const translatedPdfPath = path.join(langDir, `TheMathematicsOfSurvival_${lang}.pdf`);
    if (!fs.existsSync(translatedPdfPath)) {
      console.log(`  SKIP ${lang} — no translated PDF found`);
      continue;
    }

    const coverDoc = await PDFDocument.load(fs.readFileSync(coverPdfPath));
    const contentDoc = await PDFDocument.load(fs.readFileSync(translatedPdfPath));
    const totalPages = contentDoc.getPageCount();

    const merged = await PDFDocument.create();

    // Add cover page
    const [cover] = await merged.copyPages(coverDoc, [0]);
    merged.addPage(cover);

    // Skip page 0 of content (the broken blank cover from previous run)
    // If the PDF has a cover already (from previous run), skip it
    const startPage = totalPages > 35 ? 1 : 0; // Content PDFs were ~34-43 pages; with bad cover they're +1
    const contentIndices = Array.from({ length: totalPages - startPage }, (_, i) => i + startPage);
    const contentPages = await merged.copyPages(contentDoc, contentIndices);
    for (const p of contentPages) merged.addPage(p);

    const mergedBytes = await merged.save();
    fs.writeFileSync(translatedPdfPath, Buffer.from(mergedBytes));

    console.log(`  ✓ ${lang}: cover + ${contentDoc.getPageCount()} pages → ${translatedPdfPath}`);

    // Clean up temp files
    fs.unlinkSync(tmpHtml);
    fs.unlinkSync(coverPdfPath);
  }

  await browser.close();

  // Clean up covers dir
  try { fs.rmdirSync(outDir); } catch {}

  console.log('\n✅ All covers generated and merged!');
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
