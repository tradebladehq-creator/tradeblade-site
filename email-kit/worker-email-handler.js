// ─── TradeBlade Email Handler (Cloudflare Worker snippet) ───
// Drop this into your existing tradeblade-license worker to add
// language-aware ebook delivery emails.
//
// The subscribe endpoint now receives { email, broker, lang } from the form.
// This module picks the correct email template and PDF link based on `lang`.

const SUPPORTED_LANGS = [
  'en','es','zh-CN','zh-TW','ja','ko','fr','de','pt','it','nl','ru',
  'pl','cs','tr','ar','he','ur','fa','hi','bn','th','vi','id','ms',
  'tl','sv','no','da','fi','el','ro','hu','uk','hr','bg'
];

const SITE = 'https://tradebladehq.com';

/**
 * Get the ebook PDF URL for a given language.
 */
function getEbookUrl(lang) {
  if (lang === 'en') return `${SITE}/assets/TheMathematicsOfSurvival.pdf`;
  return `${SITE}/assets/lang/TheMathematicsOfSurvival_${lang}.pdf`;
}

/**
 * Get the email template URL for a given language.
 * Templates live in email-kit/{lang}.html on the site.
 * In production, you'd either:
 *   1. Inline the templates in the worker (via build step)
 *   2. Fetch them from the site / R2 bucket
 *   3. Store them in KV
 */
async function getEmailTemplate(lang) {
  const code = SUPPORTED_LANGS.includes(lang) ? lang : 'en';
  const url = `${SITE}/email-kit/${code}.html`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    let html = await resp.text();
    // Replace the PDF download link with the correct language version
    html = html.replace(
      /href="[^"]*TheMathematicsOfSurvival[^"]*"/g,
      `href="${getEbookUrl(code)}"`
    );
    return html;
  } catch {
    // Fallback to English
    if (code !== 'en') return getEmailTemplate('en');
    throw new Error('Could not load email template');
  }
}

/**
 * Send the ebook delivery email.
 * Adapt the sending mechanism to your email provider:
 *   - Resend: fetch('https://api.resend.com/emails', ...)
 *   - SendGrid: fetch('https://api.sendgrid.com/v3/mail/send', ...)
 *   - Mailgun, Postmark, etc.
 *
 * Example using Resend (set RESEND_API_KEY in worker secrets):
 */
async function sendEbookEmail(email, lang, env) {
  const html = await getEmailTemplate(lang);
  // Replace unsubscribe placeholder
  const finalHtml = html.replace(
    '{{UNSUBSCRIBE_URL}}',
    `${SITE}/unsubscribe?email=${encodeURIComponent(email)}`
  );

  // ─── Resend Example ───
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'TradeBlade <noreply@tradebladehq.com>',
      to: [email],
      subject: getSubjectLine(lang),
      html: finalHtml
    })
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error('Email send failed:', err);
    throw new Error('Email delivery failed');
  }
}

/**
 * Localized email subject lines.
 */
function getSubjectLine(lang) {
  const subjects = {
    'en': 'Your free ebook: The Mathematics of Survival',
    'es': 'Tu ebook gratuito: Las Matemáticas de la Supervivencia',
    'fr': 'Votre ebook gratuit : Les Mathématiques de la Survie',
    'de': 'Ihr kostenloses E-Book: Die Mathematik des Überlebens',
    'pt': 'Seu ebook gratuito: A Matemática da Sobrevivência',
    'it': 'Il tuo ebook gratuito: La Matematica della Sopravvivenza',
    'nl': 'Uw gratis e-book: De Wiskunde van Overleven',
    'ru': 'Ваша бесплатная книга: Математика выживания',
    'pl': 'Twój darmowy ebook: Matematyka przetrwania',
    'cs': 'Váš bezplatný ebook: Matematika přežití',
    'tr': 'Ücretsiz e-kitabınız: Hayatta Kalmanın Matematiği',
    'ar': 'كتابك الإلكتروني المجاني: رياضيات البقاء',
    'he': 'הספר האלקטרוני החינמי שלך: המתמטיקה של ההישרדות',
    'ur': 'آپ کی مفت ای بک: بقا کی ریاضی',
    'fa': 'کتاب الکترونیکی رایگان شما: ریاضیات بقا',
    'hi': 'आपकी मुफ्त ई-बुक: जीवित रहने का गणित',
    'bn': 'আপনার বিনামূল্যে ই-বুক: টিকে থাকার গণিত',
    'th': 'อีบุ๊กฟรีของคุณ: คณิตศาสตร์แห่งการอยู่รอด',
    'vi': 'Ebook miễn phí của bạn: Toán học của sự sinh tồn',
    'id': 'Ebook gratis Anda: Matematika Bertahan Hidup',
    'ms': 'Ebook percuma anda: Matematik Kelangsungan Hidup',
    'tl': 'Ang iyong libreng ebook: Ang Matematika ng Kaligtasan',
    'zh-CN': '您的免费电子书：生存的数学',
    'zh-TW': '您的免費電子書：生存的數學',
    'ja': '無料の電子書籍：生存の数学',
    'ko': '무료 전자책: 생존의 수학',
    'sv': 'Din gratis e-bok: Överlevnadens matematik',
    'no': 'Din gratis e-bok: Overlevelsens matematikk',
    'da': 'Din gratis e-bog: Overlevelsens matematik',
    'fi': 'Ilmainen e-kirjasi: Selviytymisen matematiikka',
    'el': 'Το δωρεάν ebook σας: Τα Μαθηματικά της Επιβίωσης',
    'ro': 'Ebook-ul tău gratuit: Matematica supraviețuirii',
    'hu': 'Ingyenes e-könyved: A túlélés matematikája',
    'uk': 'Ваша безкоштовна книга: Математика виживання',
    'hr': 'Vaša besplatna e-knjiga: Matematika preživljavanja',
    'bg': 'Вашата безплатна е-книга: Математиката на оцеляването'
  };
  return subjects[lang] || subjects['en'];
}

// ─── Integration point ───
// In your existing subscribe handler, after saving the subscriber, call:
//
//   const { email, broker, lang } = await request.json();
//   // ... your existing subscribe logic ...
//   await sendEbookEmail(email, lang || 'en', env);
//

export { sendEbookEmail, getEbookUrl, getEmailTemplate, getSubjectLine, SUPPORTED_LANGS };
