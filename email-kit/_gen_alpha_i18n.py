#!/usr/bin/env python3
# Generates alpha opt-in localization:
#  1. inserts the alpha opt-in button into each book email email-kit/{lang}.html
#     (before the universal <!-- Footer --> anchor)
#  2. writes the instructions email email-kit/alpha-{lang}.html
# Brand terms TradeBlade / Elite and support@tradebladehq.com are NOT translated.
# {{ALPHA_OPTIN_URL}} and {{UNSUBSCRIBE_URL}} stay literal (worker substitutes them).
import os
import sys
sys.stdout.reconfigure(encoding='utf-8')
HERE = os.path.dirname(os.path.abspath(__file__))
RTL = {'ar', 'fa', 'he', 'ur'}

# Per-language strings. Keys:
# subj,h1,intro,s1h,s1b,s2h,s2b,s3h,s3b,reach,unsub,bh3,bp,ba
T = {
 'es': dict(subj="Ya estás dentro: próximos pasos del Alpha de TradeBlade",
   h1="Estás en el Alpha", intro="Gracias por unirte al Alpha de TradeBlade. Esto es lo que sigue:",
   s1h="Tu licencia", s1b="Emitimos cada licencia del alpha a mano. Te enviaremos tu clave Elite completa a esta dirección muy pronto, normalmente en un día.",
   s2h="Cómo te contactaremos", s2b="Lanzamos versiones y correcciones del alpha con rapidez y a veces necesitamos contactarte enseguida. Responde a este correo con un número de teléfono si prefieres que te enviemos mensajes; de lo contrario, lo mantenemos todo por correo.",
   s3h="Lo que pedimos", s3b="Es una versión preliminar, así que espera asperezas y cuéntanos lo que encuentres. Cuánto lo uses y nos ayudes a mejorarlo decide el nivel que conservas en el lanzamiento, y el acceso nunca se corta de golpe: bajas como mínimo a un nivel gratuito.",
   reach="Contáctanos cuando quieras: responde aquí o a support@tradebladehq.com.", unsub="Cancelar suscripción",
   bh3="¿Quieres entrar al Alpha?", bp="Acceso Elite completo, gratis, antes del lanzamiento público: solo tienes que levantar la mano.", ba="Unirme al Alpha &rarr;"),
 'fr': dict(subj="Vous y êtes : les prochaines étapes de l'Alpha TradeBlade",
   h1="Vous êtes dans l'Alpha", intro="Merci d'avoir rejoint l'Alpha TradeBlade. Voici la suite :",
   s1h="Votre licence", s1b="Nous délivrons chaque licence alpha à la main. Nous vous enverrons votre clé Elite complète à cette adresse très bientôt, généralement sous un jour.",
   s2h="Comment nous vous contacterons", s2b="Nous publions les versions et correctifs de l'alpha rapidement et devons parfois vous joindre vite. Répondez à cet e-mail avec un numéro de téléphone si vous préférez les SMS ; sinon nous restons sur l'e-mail.",
   s3h="Ce que nous demandons", s3b="C'est une préversion, attendez-vous à des imperfections et dites-nous ce que vous rencontrez. La façon dont vous l'utilisez et nous aidez à l'améliorer décide du niveau que vous gardez au lancement, et l'accès ne se coupe jamais brutalement : vous passez au minimum à un niveau gratuit.",
   reach="Joignez-nous à tout moment : répondez ici ou à support@tradebladehq.com.", unsub="Se désabonner",
   bh3="Envie de rejoindre l'Alpha ?", bp="Accès Elite complet, gratuit, avant le lancement public : il suffit de lever la main.", ba="Rejoindre l'Alpha &rarr;"),
 'de': dict(subj="Du bist dabei: Deine nächsten Schritte für die TradeBlade Alpha",
   h1="Du bist in der Alpha", intro="Danke, dass du der TradeBlade Alpha beigetreten bist. So geht es weiter:",
   s1h="Deine Lizenz", s1b="Wir vergeben jede Alpha-Lizenz von Hand. Wir senden dir deinen vollständigen Elite-Schlüssel in Kürze an diese Adresse, meist innerhalb eines Tages.",
   s2h="Wie wir dich erreichen", s2b="Wir liefern Alpha-Builds und Fixes schnell und müssen dich manchmal kurzfristig erreichen. Antworte auf diese E-Mail mit einer Telefonnummer, wenn du lieber SMS möchtest; sonst bleiben wir bei E-Mail.",
   s3h="Worum wir bitten", s3b="Es ist eine Vorabversion, rechne also mit Ecken und Kanten und sag uns, worauf du stößt. Wie sehr du sie nutzt und mithilfst, sie zu formen, entscheidet über die Stufe, die du beim Start behältst, und der Zugang endet nie abrupt: Du fällst mindestens auf eine kostenlose Stufe.",
   reach="Erreiche uns jederzeit: antworte hier oder an support@tradebladehq.com.", unsub="Abbestellen",
   bh3="Lust auf die Alpha?", bp="Voller Elite-Zugang, kostenlos, vor dem öffentlichen Start - du musst dich nur melden.", ba="An der Alpha teilnehmen &rarr;"),
 'pt': dict(subj="Você entrou: próximos passos do Alpha da TradeBlade",
   h1="Você está no Alpha", intro="Obrigado por entrar no Alpha da TradeBlade. Veja o que vem a seguir:",
   s1h="Sua licença", s1b="Emitimos cada licença do alpha manualmente. Enviaremos sua chave Elite completa para este endereço em breve, normalmente dentro de um dia.",
   s2h="Como vamos te contatar", s2b="Lançamos versões e correções do alpha rapidamente e às vezes precisamos te alcançar logo. Responda a este e-mail com um número de telefone se preferir mensagens; caso contrário, mantemos tudo por e-mail.",
   s3h="O que pedimos", s3b="É uma versão prévia, então espere arestas e nos diga o que encontrar. O quanto você usa e ajuda a moldar decide o nível que você mantém no lançamento, e o acesso nunca é cortado de repente: você cai no mínimo para um nível gratuito.",
   reach="Fale conosco quando quiser: responda aqui ou para support@tradebladehq.com.", unsub="Cancelar inscrição",
   bh3="Quer entrar no Alpha?", bp="Acesso Elite completo, grátis, antes do lançamento público: basta levantar a mão.", ba="Entrar no Alpha &rarr;"),
 'it': dict(subj="Sei dentro: i prossimi passi dell'Alpha di TradeBlade",
   h1="Sei nell'Alpha", intro="Grazie per esserti unito all'Alpha di TradeBlade. Ecco cosa succede ora:",
   s1h="La tua licenza", s1b="Emettiamo ogni licenza alpha a mano. Ti invieremo la tua chiave Elite completa a questo indirizzo a breve, di solito entro un giorno.",
   s2h="Come ti contatteremo", s2b="Rilasciamo build e correzioni dell'alpha rapidamente e a volte dobbiamo raggiungerti in fretta. Rispondi a questa email con un numero di telefono se preferisci i messaggi; altrimenti restiamo all'email.",
   s3h="Cosa ti chiediamo", s3b="È una versione preliminare, quindi aspettati imperfezioni e dicci cosa incontri. Quanto la usi e ci aiuti a migliorarla decide il livello che mantieni al lancio, e l'accesso non si interrompe mai di colpo: scendi al minimo a un livello gratuito.",
   reach="Contattaci quando vuoi: rispondi qui o a support@tradebladehq.com.", unsub="Annulla iscrizione",
   bh3="Vuoi entrare nell'Alpha?", bp="Accesso Elite completo, gratis, prima del lancio pubblico: basta alzare la mano.", ba="Entra nell'Alpha &rarr;"),
 'nl': dict(subj="Je bent erbij: de volgende stappen voor de TradeBlade Alpha",
   h1="Je zit in de Alpha", intro="Bedankt dat je deelneemt aan de TradeBlade Alpha. Dit gebeurt er nu:",
   s1h="Je licentie", s1b="We geven elke alpha-licentie met de hand uit. We sturen je volledige Elite-sleutel binnenkort naar dit adres, meestal binnen een dag.",
   s2h="Hoe we je bereiken", s2b="We brengen alpha-builds en fixes snel uit en moeten je soms snel bereiken. Antwoord op deze e-mail met een telefoonnummer als je liever sms krijgt; anders houden we alles per e-mail.",
   s3h="Wat we vragen", s3b="Het is pre-release, dus verwacht ruwe randjes en laat ons weten wat je tegenkomt. Hoeveel je het gebruikt en helpt vormgeven bepaalt het niveau dat je bij de lancering houdt, en de toegang stopt nooit abrupt: je zakt minstens naar een gratis niveau.",
   reach="Bereik ons altijd: antwoord hier of op support@tradebladehq.com.", unsub="Uitschrijven",
   bh3="Wil je de Alpha in?", bp="Volledige Elite-toegang, gratis, vóór de openbare lancering - je hoeft alleen je hand op te steken.", ba="Doe mee aan de Alpha &rarr;"),
 'ru': dict(subj="Вы в деле: следующие шаги в альфе TradeBlade",
   h1="Вы в альфе", intro="Спасибо, что присоединились к альфе TradeBlade. Вот что дальше:",
   s1h="Ваша лицензия", s1b="Мы выдаём каждую альфа-лицензию вручную. Мы отправим ваш полный ключ Elite на этот адрес в ближайшее время, обычно в течение дня.",
   s2h="Как мы свяжемся с вами", s2b="Мы быстро выпускаем альфа-сборки и исправления и иногда нам нужно связаться с вами срочно. Ответьте на это письмо номером телефона, если предпочитаете SMS; иначе мы оставим всё по электронной почте.",
   s3h="О чём мы просим", s3b="Это предварительная версия, так что ожидайте шероховатостей и сообщайте нам обо всём, что заметите. То, как активно вы пользуетесь и помогаете нам, определяет уровень, который вы сохраните на запуске, и доступ никогда не отключается резко: вы опускаетесь как минимум до бесплатного уровня.",
   reach="Свяжитесь с нами в любое время: ответьте здесь или на support@tradebladehq.com.", unsub="Отписаться",
   bh3="Хотите в альфу?", bp="Полный доступ Elite, бесплатно, до публичного запуска - нужно лишь поднять руку.", ba="Вступить в альфу &rarr;"),
 'ja': dict(subj="参加完了 - TradeBlade アルファの次のステップ",
   h1="アルファに参加しました", intro="TradeBlade アルファへのご参加ありがとうございます。次の流れは以下のとおりです。",
   s1h="ライセンスについて", s1b="アルファのライセンスはすべて手動で発行します。完全な Elite キーをまもなくこのアドレスにお送りします（通常1日以内）。",
   s2h="ご連絡方法", s2b="アルファのビルドや修正は素早く配信し、急ぎでご連絡が必要なこともあります。SMS をご希望の場合は電話番号をこのメールにご返信ください。そうでなければすべてメールで対応します。",
   s3h="お願い", s3b="プレリリース版のため粗い部分があります。気づいた点をぜひお知らせください。どれだけ使い、改善に協力いただくかで、正式版で維持できるプランが決まります。アクセスが突然切れることはなく、最低でも無料プランに移行します。",
   reach="いつでもご連絡ください: この返信または support@tradebladehq.com まで。", unsub="配信停止",
   bh3="アルファに参加しませんか？", bp="一般公開前に、完全な Elite アクセスを無料で。手を挙げるだけです。", ba="アルファに参加する &rarr;"),
 'ko': dict(subj="참여 완료 - TradeBlade 알파 다음 단계",
   h1="알파에 참여하셨습니다", intro="TradeBlade 알파에 참여해 주셔서 감사합니다. 다음 순서는 이렇습니다:",
   s1h="라이선스 안내", s1b="모든 알파 라이선스는 직접 발급합니다. 전체 Elite 키를 곧 이 주소로 보내드립니다(보통 하루 이내).",
   s2h="연락 방법", s2b="알파 빌드와 수정 사항을 빠르게 배포하며 때때로 빠른 연락이 필요합니다. 문자를 원하시면 전화번호를 회신해 주세요. 아니면 모두 이메일로 진행합니다.",
   s3h="부탁드리는 점", s3b="사전 출시 버전이라 거친 부분이 있을 수 있으니 발견하시는 점을 알려주세요. 얼마나 사용하고 개선에 도움을 주시는지에 따라 정식 출시 때 유지되는 등급이 정해지며, 접근이 갑자기 끊기지 않고 최소 무료 등급으로 내려갑니다.",
   reach="언제든 연락하세요: 여기로 회신하시거나 support@tradebladehq.com.", unsub="수신 거부",
   bh3="알파에 참여하시겠어요?", bp="정식 출시 전, 완전한 Elite 액세스를 무료로 - 손만 들면 됩니다.", ba="알파 참여하기 &rarr;"),
 'zh-CN': dict(subj="你已加入 - TradeBlade Alpha 后续步骤",
   h1="你已加入 Alpha", intro="感谢加入 TradeBlade Alpha。接下来是这些步骤：",
   s1h="你的许可证", s1b="每个 Alpha 许可证都由我们手动签发。我们会尽快把完整的 Elite 密钥发到此邮箱，通常一天内。",
   s2h="我们如何联系你", s2b="我们会快速发布 Alpha 版本和修复，有时需要尽快联系你。如果你更喜欢短信，请回复此邮件并留下电话号码；否则我们都用邮件。",
   s3h="我们的请求", s3b="这是预发布版本，难免有粗糙之处，欢迎告诉我们你遇到的问题。你使用的程度和帮助改进的程度，决定你在正式发布时保留的等级，而且访问权限不会突然中断：你至少会降到免费等级。",
   reach="随时联系我们：回复此邮件或发送至 support@tradebladehq.com。", unsub="退订",
   bh3="想加入 Alpha 吗？", bp="公开发布前，免费获得完整 Elite 访问权限 - 你只需举手。", ba="加入 Alpha &rarr;"),
 'zh-TW': dict(subj="你已加入 - TradeBlade Alpha 後續步驟",
   h1="你已加入 Alpha", intro="感謝加入 TradeBlade Alpha。接下來是這些步驟：",
   s1h="你的授權", s1b="每個 Alpha 授權都由我們手動核發。我們會盡快把完整的 Elite 金鑰寄到此信箱，通常一天內。",
   s2h="我們如何聯絡你", s2b="我們會快速發布 Alpha 版本與修正，有時需要盡快聯絡你。如果你偏好簡訊，請回覆此郵件並留下電話號碼；否則我們都用電子郵件。",
   s3h="我們的請求", s3b="這是預先發布版本，難免有粗糙之處，歡迎告訴我們你遇到的問題。你使用的程度與協助改進的程度，決定你在正式發布時保留的等級，而且存取權不會突然中斷：你至少會降到免費等級。",
   reach="隨時聯絡我們：回覆此郵件或寄至 support@tradebladehq.com。", unsub="取消訂閱",
   bh3="想加入 Alpha 嗎？", bp="公開發布前，免費取得完整 Elite 存取權 - 你只需舉手。", ba="加入 Alpha &rarr;"),
 'ar': dict(subj="أنت في البرنامج - خطواتك التالية في ألفا TradeBlade",
   h1="أنت في برنامج ألفا", intro="شكرًا لانضمامك إلى ألفا TradeBlade. إليك ما سيحدث بعد ذلك:",
   s1h="ترخيصك", s1b="نُصدر كل ترخيص ألفا يدويًا. سنرسل مفتاح Elite الكامل إلى هذا العنوان قريبًا، عادةً خلال يوم.",
   s2h="كيف سنتواصل معك", s2b="نُطلق إصدارات ألفا والإصلاحات بسرعة وقد نحتاج للوصول إليك بسرعة أحيانًا. ردّ على هذا البريد برقم هاتف إن كنت تفضّل الرسائل النصية؛ وإلا فسنُبقي كل شيء عبر البريد.",
   s3h="ما نطلبه", s3b="هذه نسخة أولية، لذا توقّع بعض العيوب وأخبرنا بما تواجهه. مقدار استخدامك ومساعدتك في تحسينه يحدّد المستوى الذي تحتفظ به عند الإطلاق، والوصول لا يُقطع فجأة أبدًا: تنزل إلى مستوى مجاني كحد أدنى.",
   reach="تواصل معنا في أي وقت: ردّ هنا أو على support@tradebladehq.com.", unsub="إلغاء الاشتراك",
   bh3="هل تريد الانضمام إلى ألفا؟", bp="وصول Elite كامل ومجاني قبل الإطلاق العام - كل ما عليك هو رفع يدك.", ba="&larr; انضم إلى ألفا"),
 'bg': dict(subj="Вие сте вътре - следващите ви стъпки за TradeBlade Alpha",
   h1="Вие сте в Alpha", intro="Благодарим, че се присъединихте към TradeBlade Alpha. Ето какво следва:",
   s1h="Вашият лиценз", s1b="Издаваме всеки алфа лиценз ръчно. Скоро ще изпратим пълния ви Elite ключ на този адрес, обикновено в рамките на ден.",
   s2h="Как ще се свържем с вас", s2b="Пускаме алфа версии и поправки бързо и понякога трябва да се свържем с вас спешно. Отговорете на този имейл с телефонен номер, ако предпочитате да ви пишем по SMS; в противен случай поддържаме всичко по имейл.",
   s3h="Какво молим", s3b="Това е предварителна версия, така че очаквайте недостатъци и ни казвайте на какво се натъквате. Колко я използвате и помагате да я оформим определя нивото, което запазвате при пускането, а достъпът никога не се прекъсва рязко: падате най-малко до безплатно ниво.",
   reach="Свържете се с нас по всяко време: отговорете тук или на support@tradebladehq.com.", unsub="Отписване",
   bh3="Искате ли в Alpha?", bp="Пълен Elite достъп, безплатно, преди публичното пускане - просто трябва да вдигнете ръка.", ba="Включете се в Alpha &rarr;"),
 'bn': dict(subj="আপনি যুক্ত হয়েছেন - আপনার TradeBlade Alpha-এর পরবর্তী ধাপ",
   h1="আপনি Alpha-তে আছেন", intro="TradeBlade Alpha-তে যোগ দেওয়ার জন্য ধন্যবাদ। এরপর যা হবে:",
   s1h="আপনার লাইসেন্স", s1b="আমরা প্রতিটি আলফা লাইসেন্স হাতে ইস্যু করি। আপনার সম্পূর্ণ Elite কী শীঘ্রই এই ঠিকানায় পাঠাব, সাধারণত এক দিনের মধ্যে।",
   s2h="আমরা কীভাবে আপনার সাথে যোগাযোগ করব", s2b="আমরা আলফা বিল্ড ও সংশোধন দ্রুত পাঠাই এবং কখনও কখনও দ্রুত আপনার সাথে যোগাযোগ করা দরকার হয়। আপনি যদি টেক্সট পেতে চান তবে এই ইমেইলে একটি ফোন নম্বর দিয়ে উত্তর দিন; অন্যথায় আমরা সবকিছু ইমেইলেই রাখি।",
   s3h="আমরা যা চাই", s3b="এটি প্রাক-প্রকাশ সংস্করণ, তাই কিছু অসম্পূর্ণতা আশা করুন এবং যা পান তা আমাদের জানান। আপনি কতটা ব্যবহার করেন ও একে গড়ে তুলতে সাহায্য করেন তা ঠিক করে দেয় লঞ্চের সময় আপনি কোন স্তর রাখবেন, আর অ্যাক্সেস কখনও হঠাৎ বন্ধ হয় না: আপনি অন্তত একটি ফ্রি স্তরে নেমে যান।",
   reach="যেকোনো সময় আমাদের সাথে যোগাযোগ করুন: এখানে উত্তর দিন বা support@tradebladehq.com-এ লিখুন।", unsub="আনসাবস্ক্রাইব",
   bh3="Alpha-তে যুক্ত হতে চান?", bp="সর্বজনীন প্রকাশের আগে, সম্পূর্ণ Elite অ্যাক্সেস, বিনামূল্যে - আপনাকে কেবল হাত তুলতে হবে।", ba="Alpha-তে যোগ দিন &rarr;"),
 'cs': dict(subj="Jste uvnitř - vaše další kroky pro TradeBlade Alpha",
   h1="Jste v Alpha", intro="Děkujeme, že jste se přidali do TradeBlade Alpha. Tady je, co bude následovat:",
   s1h="Vaše licence", s1b="Každou alfa licenci vydáváme ručně. Váš úplný klíč Elite vám brzy pošleme na tuto adresu, obvykle do jednoho dne.",
   s2h="Jak vás budeme kontaktovat", s2b="Alfa sestavení a opravy vydáváme rychle a někdy se s vámi potřebujeme spojit rychle. Odpovězte na tento e-mail s telefonním číslem, pokud chcete raději SMS; jinak vše necháváme na e-mailu.",
   s3h="O co vás žádáme", s3b="Je to předběžná verze, takže počítejte s nedodělky a dejte nám vědět, na co narazíte. Kolik ji používáte a pomáháte ji formovat rozhoduje o úrovni, kterou si při spuštění ponecháte, a přístup se nikdy nepřeruší naráz: klesnete nejméně na bezplatnou úroveň.",
   reach="Ozvěte se nám kdykoli: odpovězte zde nebo na support@tradebladehq.com.", unsub="Odhlásit odběr",
   bh3="Chcete do Alpha?", bp="Plný přístup Elite, zdarma, před veřejným spuštěním - stačí jen zvednout ruku.", ba="Přidat se do Alpha &rarr;"),
 'da': dict(subj="Du er med - dine næste skridt i TradeBlade Alpha",
   h1="Du er med i Alpha", intro="Tak fordi du tilmeldte dig TradeBlade Alpha. Her er, hvad der sker nu:",
   s1h="Din licens", s1b="Vi udsteder hver alpha-licens manuelt. Vi sender din fulde Elite-nøgle til denne adresse meget snart, normalt inden for en dag.",
   s2h="Sådan kontakter vi dig", s2b="Vi udgiver alpha-builds og rettelser hurtigt og har nogle gange brug for at nå dig hurtigt. Svar på denne e-mail med et telefonnummer, hvis du hellere vil have sms; ellers holder vi alt til e-mail.",
   s3h="Hvad vi beder om", s3b="Det er en førudgivelse, så forvent ujævne kanter og fortæl os, hvad du støder på. Hvor meget du bruger den og hjælper med at forme den afgør det niveau, du beholder ved lanceringen, og adgangen stopper aldrig brat: du falder som minimum til et gratis niveau.",
   reach="Kontakt os når som helst: svar her eller på support@tradebladehq.com.", unsub="Afmeld",
   bh3="Vil du med i Alpha?", bp="Fuld Elite-adgang, gratis, før den offentlige lancering - du skal bare række hånden op.", ba="Tilmeld dig Alpha &rarr;"),
 'el': dict(subj="Είστε μέσα - τα επόμενα βήματά σας για το TradeBlade Alpha",
   h1="Είστε στο Alpha", intro="Ευχαριστούμε που εγγραφήκατε στο TradeBlade Alpha. Δείτε τι ακολουθεί:",
   s1h="Η άδειά σας", s1b="Εκδίδουμε κάθε άδεια alpha με το χέρι. Θα στείλουμε το πλήρες κλειδί Elite σε αυτή τη διεύθυνση πολύ σύντομα, συνήθως μέσα σε μία ημέρα.",
   s2h="Πώς θα επικοινωνήσουμε μαζί σας", s2b="Κυκλοφορούμε εκδόσεις και διορθώσεις alpha γρήγορα και μερικές φορές χρειάζεται να σας βρούμε γρήγορα. Απαντήστε σε αυτό το email με έναν αριθμό τηλεφώνου αν προτιμάτε να σας στέλνουμε SMS· αλλιώς κρατάμε τα πάντα στο email.",
   s3h="Τι ζητάμε", s3b="Είναι προέκδοση, οπότε περιμένετε ατέλειες και πείτε μας τι συναντάτε. Το πόσο τη χρησιμοποιείτε και βοηθάτε να διαμορφωθεί καθορίζει το επίπεδο που κρατάτε στην κυκλοφορία, και η πρόσβαση δεν κόβεται ποτέ απότομα: πέφτετε το λιγότερο σε ένα δωρεάν επίπεδο.",
   reach="Επικοινωνήστε μαζί μας οποτεδήποτε: απαντήστε εδώ ή στο support@tradebladehq.com.", unsub="Κατάργηση εγγραφής",
   bh3="Θέλετε να μπείτε στο Alpha;", bp="Πλήρης πρόσβαση Elite, δωρεάν, πριν τη δημόσια κυκλοφορία - αρκεί να σηκώσετε το χέρι σας.", ba="Συμμετοχή στο Alpha &rarr;"),
 'fa': dict(subj="شما عضو شدید - مراحل بعدی شما در آلفای TradeBlade",
   h1="شما در آلفا هستید", intro="از پیوستن شما به آلفای TradeBlade سپاسگزاریم. در ادامه چه اتفاقی می‌افتد:",
   s1h="مجوز شما", s1b="ما هر مجوز آلفا را به‌صورت دستی صادر می‌کنیم. کلید کامل Elite شما را به‌زودی به این آدرس می‌فرستیم، معمولاً ظرف یک روز.",
   s2h="چگونه با شما تماس می‌گیریم", s2b="ما نسخه‌ها و رفع اشکال‌های آلفا را سریع منتشر می‌کنیم و گاهی نیاز داریم سریع با شما تماس بگیریم. اگر پیامک را ترجیح می‌دهید، با یک شماره تلفن به این ایمیل پاسخ دهید؛ در غیر این صورت همه چیز را از طریق ایمیل پیش می‌بریم.",
   s3h="چه می‌خواهیم", s3b="این نسخه پیش از انتشار است، پس انتظار ناهمواری‌ها را داشته باشید و آنچه را با آن روبه‌رو می‌شوید به ما بگویید. میزان استفاده شما و کمک‌تان به شکل‌گیری آن تعیین می‌کند که در زمان عرضه چه سطحی را نگه می‌دارید، و دسترسی هرگز ناگهان قطع نمی‌شود: دست‌کم به یک سطح رایگان می‌روید.",
   reach="هر زمان با ما در تماس باشید: همین‌جا پاسخ دهید یا به support@tradebladehq.com.", unsub="لغو اشتراک",
   bh3="می‌خواهید به آلفا بپیوندید؟", bp="دسترسی کامل Elite، رایگان، پیش از عرضه عمومی - فقط کافی است دست بلند کنید.", ba="&larr; به آلفا بپیوندید"),
 'fi': dict(subj="Olet mukana - seuraavat askeleesi TradeBlade Alphassa",
   h1="Olet mukana Alphassa", intro="Kiitos, että liityit TradeBlade Alphaan. Näin etenemme:",
   s1h="Lisenssisi", s1b="Myönnämme jokaisen alpha-lisenssin käsin. Lähetämme täyden Elite-avaimesi tähän osoitteeseen pian, yleensä päivän sisällä.",
   s2h="Miten tavoitamme sinut", s2b="Julkaisemme alpha-versioita ja korjauksia nopeasti ja meidän on joskus tavoitettava sinut pikaisesti. Vastaa tähän sähköpostiin puhelinnumerolla, jos haluat mieluummin tekstiviestin; muuten pidämme kaiken sähköpostilla.",
   s3h="Mitä pyydämme", s3b="Tämä on esijulkaisu, joten odota karkeita reunoja ja kerro meille, mihin törmäät. Se, kuinka paljon käytät sitä ja autat muotoilemaan sitä, ratkaisee tason, jonka pidät julkaisussa, eikä pääsy katkea koskaan äkillisesti: putoat vähintään ilmaiselle tasolle.",
   reach="Ota meihin yhteyttä milloin tahansa: vastaa tähän tai osoitteeseen support@tradebladehq.com.", unsub="Peruuta tilaus",
   bh3="Haluatko mukaan Alphaan?", bp="Täysi Elite-käyttöoikeus, ilmaiseksi, ennen julkista julkaisua - sinun tarvitsee vain nostaa kätesi.", ba="Liity Alphaan &rarr;"),
 'he': dict(subj="אתם בפנים - הצעדים הבאים שלכם ב-Alpha של TradeBlade",
   h1="אתם ב-Alpha", intro="תודה שהצטרפתם ל-Alpha של TradeBlade. הנה מה שקורה עכשיו:",
   s1h="הרישיון שלכם", s1b="אנחנו מנפיקים כל רישיון אלפא ידנית. נשלח לכם בקרוב את מפתח ה-Elite המלא לכתובת זו, בדרך כלל תוך יום.",
   s2h="איך ניצור איתכם קשר", s2b="אנחנו משחררים גרסאות ותיקונים של אלפא במהירות ולפעמים צריכים להשיג אתכם מהר. השיבו למייל הזה עם מספר טלפון אם אתם מעדיפים שנשלח הודעות; אחרת נשאיר הכול במייל.",
   s3h="מה אנחנו מבקשים", s3b="זו גרסה מוקדמת, אז צפו לפינות מחוספסות וספרו לנו במה נתקלתם. כמה שתשתמשו ותעזרו לעצב אותה קובע את הרמה שתשמרו בהשקה, והגישה לעולם לא נחתכת בבת אחת: אתם יורדים לכל הפחות לרמה חינמית.",
   reach="צרו איתנו קשר בכל עת: השיבו כאן או לכתובת support@tradebladehq.com.", unsub="ביטול הרשמה",
   bh3="רוצים להצטרף ל-Alpha?", bp="גישת Elite מלאה, בחינם, לפני ההשקה הציבורית - כל מה שצריך זה להרים יד.", ba="&larr; הצטרפו ל-Alpha"),
 'hi': dict(subj="आप शामिल हैं - आपके TradeBlade Alpha के अगले कदम",
   h1="आप Alpha में हैं", intro="TradeBlade Alpha में शामिल होने के लिए धन्यवाद। आगे यह होगा:",
   s1h="आपका लाइसेंस", s1b="हम हर अल्फा लाइसेंस हाथ से जारी करते हैं। हम आपकी पूरी Elite कुंजी जल्द ही इस पते पर भेजेंगे, आमतौर पर एक दिन के भीतर।",
   s2h="हम आपसे कैसे संपर्क करेंगे", s2b="हम अल्फा बिल्ड और सुधार तेज़ी से भेजते हैं और कभी-कभी आपसे जल्दी संपर्क करना ज़रूरी होता है। अगर आप टेक्स्ट पसंद करते हैं तो इस ईमेल का जवाब फ़ोन नंबर के साथ दें; वरना हम सब कुछ ईमेल पर ही रखते हैं।",
   s3h="हम क्या चाहते हैं", s3b="यह प्री-रिलीज़ है, इसलिए कुछ खामियों की उम्मीद रखें और जो भी मिले हमें बताएं। आप इसे कितना इस्तेमाल करते हैं और इसे संवारने में मदद करते हैं, यह तय करता है कि लॉन्च पर आप कौन-सा टियर रखेंगे, और पहुँच कभी अचानक बंद नहीं होती: आप कम से कम एक मुफ़्त टियर पर आ जाते हैं।",
   reach="हमसे कभी भी संपर्क करें: यहाँ जवाब दें या support@tradebladehq.com पर लिखें।", unsub="सदस्यता रद्द करें",
   bh3="Alpha में आना चाहते हैं?", bp="सार्वजनिक लॉन्च से पहले, पूरी Elite पहुँच, मुफ़्त - बस आपको हाथ उठाना है।", ba="Alpha में शामिल हों &rarr;"),
 'hr': dict(subj="Unutra ste - vaši sljedeći koraci za TradeBlade Alpha",
   h1="U Alphi ste", intro="Hvala što ste se pridružili TradeBlade Alphi. Evo što slijedi:",
   s1h="Vaša licenca", s1b="Svaku alfa licencu izdajemo ručno. Vaš puni Elite ključ poslat ćemo na ovu adresu uskoro, obično u roku od jednog dana.",
   s2h="Kako ćemo vas kontaktirati", s2b="Alfa verzije i ispravke objavljujemo brzo i ponekad vas trebamo brzo dobiti. Odgovorite na ovaj e-mail s brojem telefona ako biste radije primali SMS; inače sve držimo na e-mailu.",
   s3h="Što tražimo", s3b="Ovo je predizdanje, pa očekujte nedostatke i recite nam na što naiđete. Koliko je koristite i pomažete oblikovati odlučuje o razini koju zadržavate pri lansiranju, a pristup se nikad ne prekida naglo: padate najmanje na besplatnu razinu.",
   reach="Javite nam se bilo kada: odgovorite ovdje ili na support@tradebladehq.com.", unsub="Odjava",
   bh3="Želite u Alphu?", bp="Puni Elite pristup, besplatno, prije javnog lansiranja - samo trebate podići ruku.", ba="Pridružite se Alphi &rarr;"),
 'hu': dict(subj="Bent vagy - a következő lépéseid a TradeBlade Alphában",
   h1="Bent vagy az Alphában", intro="Köszönjük, hogy csatlakoztál a TradeBlade Alphához. Így folytatódik:",
   s1h="A licenced", s1b="Minden alfa licencet kézzel állítunk ki. A teljes Elite kulcsodat hamarosan elküldjük erre a címre, általában egy napon belül.",
   s2h="Hogyan érünk el", s2b="Az alfa build-eket és javításokat gyorsan adjuk ki, és néha gyorsan el kell érnünk téged. Válaszolj erre az e-mailre egy telefonszámmal, ha inkább SMS-t szeretnél; egyébként mindent e-mailben tartunk.",
   s3h="Amit kérünk", s3b="Ez egy kiadás előtti verzió, így számíts döccenőkre, és mondd el, mibe ütközöl. Hogy mennyit használod és segítesz alakítani, az dönti el, milyen szintet tartasz meg az induláskor, és a hozzáférés sosem szakad meg hirtelen: legalább egy ingyenes szintre esel vissza.",
   reach="Keress minket bármikor: válaszolj itt vagy a support@tradebladehq.com címen.", unsub="Leiratkozás",
   bh3="Be akarsz kerülni az Alphába?", bp="Teljes Elite hozzáférés, ingyen, a nyilvános indulás előtt - csak fel kell tenned a kezed.", ba="Csatlakozom az Alphához &rarr;"),
 'id': dict(subj="Anda ikut - langkah berikutnya untuk TradeBlade Alpha",
   h1="Anda ada di Alpha", intro="Terima kasih telah bergabung dengan TradeBlade Alpha. Berikut yang terjadi selanjutnya:",
   s1h="Lisensi Anda", s1b="Kami menerbitkan setiap lisensi alpha secara manual. Kami akan mengirim kunci Elite lengkap Anda ke alamat ini segera, biasanya dalam satu hari.",
   s2h="Bagaimana kami menghubungi Anda", s2b="Kami merilis build dan perbaikan alpha dengan cepat dan terkadang perlu menghubungi Anda dengan cepat. Balas email ini dengan nomor telepon jika Anda lebih suka kami SMS; jika tidak, kami menjaga semuanya lewat email.",
   s3h="Yang kami minta", s3b="Ini pra-rilis, jadi harap maklum ada bagian yang masih kasar dan beri tahu kami apa yang Anda temui. Seberapa banyak Anda memakainya dan membantu membentuknya menentukan tier yang Anda pertahankan saat peluncuran, dan akses tidak pernah terputus mendadak: Anda turun setidaknya ke tier gratis.",
   reach="Hubungi kami kapan saja: balas di sini atau ke support@tradebladehq.com.", unsub="Berhenti berlangganan",
   bh3="Mau ikut Alpha?", bp="Akses Elite penuh, gratis, sebelum peluncuran publik - Anda cukup mengangkat tangan.", ba="Ikut Alpha &rarr;"),
 'ms': dict(subj="Anda menyertai - langkah seterusnya untuk TradeBlade Alpha",
   h1="Anda dalam Alpha", intro="Terima kasih kerana menyertai TradeBlade Alpha. Inilah yang berlaku seterusnya:",
   s1h="Lesen anda", s1b="Kami mengeluarkan setiap lesen alpha secara manual. Kami akan menghantar kunci Elite penuh anda ke alamat ini tidak lama lagi, biasanya dalam sehari.",
   s2h="Cara kami menghubungi anda", s2b="Kami mengeluarkan binaan dan pembaikan alpha dengan pantas dan kadangkala perlu menghubungi anda dengan segera. Balas e-mel ini dengan nombor telefon jika anda lebih suka kami menghantar SMS; jika tidak, kami kekalkan semuanya melalui e-mel.",
   s3h="Apa yang kami minta", s3b="Ini pra-keluaran, jadi jangkakan kekurangan dan beritahu kami apa yang anda temui. Sebanyak mana anda menggunakannya dan membantu membentuknya menentukan peringkat yang anda kekalkan semasa pelancaran, dan akses tidak pernah terputus secara mengejut: anda turun sekurang-kurangnya ke peringkat percuma.",
   reach="Hubungi kami bila-bila masa: balas di sini atau ke support@tradebladehq.com.", unsub="Berhenti melanggan",
   bh3="Mahu menyertai Alpha?", bp="Akses Elite penuh, percuma, sebelum pelancaran umum - anda hanya perlu angkat tangan.", ba="Sertai Alpha &rarr;"),
 'no': dict(subj="Du er med - de neste stegene dine i TradeBlade Alpha",
   h1="Du er med i Alpha", intro="Takk for at du ble med i TradeBlade Alpha. Slik går vi videre:",
   s1h="Lisensen din", s1b="Vi utsteder hver alfa-lisens for hånd. Vi sender deg den fullstendige Elite-nøkkelen til denne adressen snart, vanligvis innen en dag.",
   s2h="Slik kontakter vi deg", s2b="Vi slipper alfa-bygg og rettelser raskt og må noen ganger nå deg kjapt. Svar på denne e-posten med et telefonnummer hvis du heller vil ha SMS; ellers holder vi alt på e-post.",
   s3h="Det vi ber om", s3b="Dette er en forhåndsversjon, så forvent ujevne kanter og fortell oss hva du støter på. Hvor mye du bruker den og hjelper til med å forme den avgjør nivået du beholder ved lansering, og tilgangen blir aldri kuttet brått: du faller minst til et gratis nivå.",
   reach="Ta kontakt når som helst: svar her eller på support@tradebladehq.com.", unsub="Meld deg av",
   bh3="Vil du være med i Alpha?", bp="Full Elite-tilgang, gratis, før den offentlige lanseringen - du trenger bare å rekke opp hånden.", ba="Bli med i Alpha &rarr;"),
 'pl': dict(subj="Jesteś w środku - twoje kolejne kroki w TradeBlade Alpha",
   h1="Jesteś w Alpha", intro="Dziękujemy za dołączenie do TradeBlade Alpha. Oto co dalej:",
   s1h="Twoja licencja", s1b="Każdą licencję alpha wydajemy ręcznie. Twój pełny klucz Elite wyślemy na ten adres już wkrótce, zwykle w ciągu jednego dnia.",
   s2h="Jak się z tobą skontaktujemy", s2b="Wydania i poprawki alpha publikujemy szybko i czasem musimy szybko się z tobą skontaktować. Odpowiedz na tego e-maila numerem telefonu, jeśli wolisz SMS-y; w przeciwnym razie zostajemy przy e-mailu.",
   s3h="O co prosimy", s3b="To wersja przedpremierowa, więc spodziewaj się niedoróbek i mów nam, na co trafiasz. To, jak bardzo z niej korzystasz i pomagasz ją kształtować, decyduje o poziomie, który zachowasz przy starcie, a dostęp nigdy nie urywa się nagle: spadasz co najmniej do poziomu darmowego.",
   reach="Skontaktuj się z nami w dowolnej chwili: odpowiedz tutaj lub na support@tradebladehq.com.", unsub="Wypisz się",
   bh3="Chcesz wejść do Alpha?", bp="Pełny dostęp Elite, za darmo, przed publicznym startem - wystarczy podnieść rękę.", ba="Dołącz do Alpha &rarr;"),
 'ro': dict(subj="Ești înăuntru - următorii tăi pași pentru TradeBlade Alpha",
   h1="Ești în Alpha", intro="Mulțumim că te-ai alăturat TradeBlade Alpha. Iată ce urmează:",
   s1h="Licența ta", s1b="Emitem fiecare licență alpha manual. Îți vom trimite cheia Elite completă la această adresă în curând, de obicei într-o zi.",
   s2h="Cum te vom contacta", s2b="Lansăm versiuni și remedieri alpha rapid și uneori trebuie să te contactăm repede. Răspunde la acest e-mail cu un număr de telefon dacă preferi să-ți trimitem SMS; altfel păstrăm totul pe e-mail.",
   s3h="Ce îți cerem", s3b="Este o versiune preliminară, așa că așteaptă-te la asperități și spune-ne ce întâlnești. Cât de mult o folosești și ne ajuți să o modelăm decide nivelul pe care îl păstrezi la lansare, iar accesul nu se întrerupe niciodată brusc: cobori cel puțin la un nivel gratuit.",
   reach="Contactează-ne oricând: răspunde aici sau la support@tradebladehq.com.", unsub="Dezabonare",
   bh3="Vrei să intri în Alpha?", bp="Acces Elite complet, gratuit, înainte de lansarea publică - trebuie doar să ridici mâna.", ba="Intră în Alpha &rarr;"),
 'sv': dict(subj="Du är med - dina nästa steg i TradeBlade Alpha",
   h1="Du är med i Alpha", intro="Tack för att du gick med i TradeBlade Alpha. Så här går vi vidare:",
   s1h="Din licens", s1b="Vi utfärdar varje alfalicens för hand. Vi skickar din fullständiga Elite-nyckel till den här adressen snart, vanligtvis inom en dag.",
   s2h="Så når vi dig", s2b="Vi släpper alfabyggen och fixar snabbt och behöver ibland nå dig snabbt. Svara på det här mejlet med ett telefonnummer om du hellre vill ha sms; annars håller vi allt till mejl.",
   s3h="Vad vi ber om", s3b="Det här är en förhandsversion, så räkna med skavanker och berätta vad du stöter på. Hur mycket du använder den och hjälper till att forma den avgör vilken nivå du behåller vid lanseringen, och åtkomsten bryts aldrig tvärt: du faller som minst till en gratisnivå.",
   reach="Hör av dig när som helst: svara här eller till support@tradebladehq.com.", unsub="Avsluta prenumeration",
   bh3="Vill du vara med i Alpha?", bp="Full Elite-åtkomst, gratis, före den offentliga lanseringen - du behöver bara räcka upp handen.", ba="Gå med i Alpha &rarr;"),
 'th': dict(subj="คุณเข้าร่วมแล้ว - ขั้นตอนต่อไปของคุณใน TradeBlade Alpha",
   h1="คุณอยู่ใน Alpha แล้ว", intro="ขอบคุณที่เข้าร่วม TradeBlade Alpha นี่คือสิ่งที่จะเกิดขึ้นต่อไป:",
   s1h="ใบอนุญาตของคุณ", s1b="เราออกใบอนุญาตอัลฟาทุกใบด้วยมือ เราจะส่งคีย์ Elite แบบเต็มของคุณไปยังที่อยู่นี้ในไม่ช้า โดยปกติภายในหนึ่งวัน",
   s2h="เราจะติดต่อคุณอย่างไร", s2b="เราปล่อยบิลด์และการแก้ไขอัลฟาอย่างรวดเร็ว และบางครั้งต้องติดต่อคุณอย่างเร่งด่วน ตอบกลับอีเมลนี้พร้อมหมายเลขโทรศัพท์หากคุณต้องการให้เราส่งข้อความ ไม่เช่นนั้นเราจะติดต่อผ่านอีเมลทั้งหมด",
   s3h="สิ่งที่เราขอ", s3b="นี่เป็นเวอร์ชันก่อนวางจำหน่าย จึงคาดว่าจะมีจุดที่ยังไม่เรียบร้อย และโปรดบอกเราว่าคุณพบอะไร คุณใช้งานมากแค่ไหนและช่วยปรับปรุงมากเพียงใดเป็นตัวกำหนดระดับที่คุณจะคงไว้ตอนเปิดตัว และการเข้าถึงจะไม่ถูกตัดกะทันหัน คุณจะลดลงไปอยู่ที่ระดับฟรีเป็นอย่างน้อย",
   reach="ติดต่อเราได้ทุกเมื่อ: ตอบกลับที่นี่หรือที่ support@tradebladehq.com", unsub="ยกเลิกการสมัคร",
   bh3="อยากเข้าร่วม Alpha ไหม?", bp="สิทธิ์เข้าถึง Elite เต็มรูปแบบ ฟรี ก่อนเปิดตัวสู่สาธารณะ - เพียงคุณยกมือขึ้น", ba="เข้าร่วม Alpha &rarr;"),
 'tl': dict(subj="Kasali ka na - ang susunod mong mga hakbang sa TradeBlade Alpha",
   h1="Nasa Alpha ka na", intro="Salamat sa pagsali sa TradeBlade Alpha. Ito ang susunod na mangyayari:",
   s1h="Ang lisensya mo", s1b="Mano-mano naming inilalabas ang bawat alpha license. Ipapadala namin ang buo mong Elite key sa address na ito sa lalong madaling panahon, kadalasan sa loob ng isang araw.",
   s2h="Paano ka namin kokontakin", s2b="Mabilis kaming naglalabas ng alpha builds at mga ayos at minsan kailangan ka naming makaabot agad. Sagutin ang email na ito na may numero ng telepono kung mas gusto mong i-text ka namin; kung hindi, email lang ang gagamitin namin.",
   s3h="Ang hinihiling namin", s3b="Pre-release ito, kaya asahan ang mga kakulangan at sabihin sa amin kung ano ang naranasan mo. Ang dami ng paggamit mo at pagtulong sa paghubog nito ang magpapasya sa tier na mapapanatili mo sa launch, at hindi basta-basta naputol ang access: bababa ka man lang sa isang libreng tier.",
   reach="Kontakin kami anumang oras: sumagot dito o sa support@tradebladehq.com.", unsub="Mag-unsubscribe",
   bh3="Gusto mong sumali sa Alpha?", bp="Buong Elite access, libre, bago ang pampublikong launch - kailangan mo lang magtaas ng kamay.", ba="Sumali sa Alpha &rarr;"),
 'tr': dict(subj="Katıldınız - TradeBlade Alpha için sonraki adımlarınız",
   h1="Alpha'dasınız", intro="TradeBlade Alpha'ya katıldığınız için teşekkürler. Bundan sonra şunlar olacak:",
   s1h="Lisansınız", s1b="Her alfa lisansını elle veriyoruz. Tam Elite anahtarınızı çok yakında bu adrese göndereceğiz, genellikle bir gün içinde.",
   s2h="Sizinle nasıl iletişim kuracağız", s2b="Alfa sürümlerini ve düzeltmeleri hızlı yayınlıyoruz ve bazen size hızlıca ulaşmamız gerekiyor. Mesaj atmamızı tercih ederseniz bu e-postaya bir telefon numarasıyla yanıt verin; aksi halde her şeyi e-postayla yürütürüz.",
   s3h="Sizden ricamız", s3b="Bu bir ön sürüm, bu yüzden pürüzler bekleyin ve karşılaştıklarınızı bize bildirin. Onu ne kadar kullandığınız ve şekillenmesine yardım ettiğiniz, lansmanda koruyacağınız seviyeyi belirler ve erişim asla aniden kesilmez: en azından ücretsiz bir seviyeye düşersiniz.",
   reach="Bize istediğiniz zaman ulaşın: buradan yanıtlayın veya support@tradebladehq.com.", unsub="Abonelikten çık",
   bh3="Alpha'ya katılmak ister misiniz?", bp="Herkese açık lansmandan önce, tam Elite erişimi, ücretsiz - tek yapmanız gereken elinizi kaldırmak.", ba="Alpha'ya katıl &rarr;"),
 'uk': dict(subj="Ви в команді - ваші наступні кроки в TradeBlade Alpha",
   h1="Ви в Alpha", intro="Дякуємо, що приєдналися до TradeBlade Alpha. Ось що буде далі:",
   s1h="Ваша ліцензія", s1b="Ми видаємо кожну альфа-ліцензію вручну. Ми надішлемо ваш повний ключ Elite на цю адресу найближчим часом, зазвичай протягом дня.",
   s2h="Як ми з вами зв'яжемося", s2b="Ми швидко випускаємо альфа-збірки та виправлення й іноді нам потрібно зв'язатися з вами терміново. Відповідайте на цей лист номером телефону, якщо віддаєте перевагу SMS; інакше ми тримаємо все на електронній пошті.",
   s3h="Про що ми просимо", s3b="Це попередня версія, тож очікуйте шорсткостей і повідомляйте нам про все, на що натрапите. Те, наскільки активно ви користуєтеся й допомагаєте її формувати, визначає рівень, який ви збережете на запуску, і доступ ніколи не вимикається різко: ви опускаєтеся щонайменше до безкоштовного рівня.",
   reach="Звертайтеся до нас будь-коли: відповідайте тут або на support@tradebladehq.com.", unsub="Відписатися",
   bh3="Хочете в Alpha?", bp="Повний доступ Elite, безкоштовно, до публічного запуску - потрібно лише підняти руку.", ba="Приєднатися до Alpha &rarr;"),
 'ur': dict(subj="آپ شامل ہیں - TradeBlade Alpha کے لیے آپ کے اگلے اقدامات",
   h1="آپ Alpha میں ہیں", intro="TradeBlade Alpha میں شامل ہونے کا شکریہ۔ آگے یہ ہوگا:",
   s1h="آپ کا لائسنس", s1b="ہم ہر الفا لائسنس ہاتھ سے جاری کرتے ہیں۔ ہم آپ کی مکمل Elite کلید جلد ہی اس پتے پر بھیجیں گے، عام طور پر ایک دن کے اندر۔",
   s2h="ہم آپ سے کیسے رابطہ کریں گے", s2b="ہم الفا بلڈز اور اصلاحات تیزی سے جاری کرتے ہیں اور کبھی کبھی ہمیں آپ سے جلدی رابطہ کرنا پڑتا ہے۔ اگر آپ پیغام بھیجنا پسند کرتے ہیں تو اس ای میل کا جواب فون نمبر کے ساتھ دیں؛ ورنہ ہم سب کچھ ای میل پر رکھتے ہیں۔",
   s3h="ہم کیا چاہتے ہیں", s3b="یہ پری ریلیز ہے، لہٰذا کچھ خامیوں کی توقع رکھیں اور ہمیں بتائیں کہ آپ کو کیا ملا۔ آپ اسے کتنا استعمال کرتے ہیں اور اسے سنوارنے میں مدد کرتے ہیں یہ طے کرتا ہے کہ لانچ پر آپ کون سا درجہ برقرار رکھیں گے، اور رسائی کبھی اچانک بند نہیں ہوتی: آپ کم از کم ایک مفت درجے پر آ جاتے ہیں۔",
   reach="کسی بھی وقت ہم سے رابطہ کریں: یہاں جواب دیں یا support@tradebladehq.com پر۔", unsub="رکنیت ختم کریں",
   bh3="Alpha میں آنا چاہتے ہیں؟", bp="عوامی لانچ سے پہلے، مکمل Elite رسائی، مفت - آپ کو بس ہاتھ اٹھانا ہے۔", ba="&larr; Alpha میں شامل ہوں"),
 'vi': dict(subj="Bạn đã tham gia - các bước tiếp theo của bạn trong TradeBlade Alpha",
   h1="Bạn đã ở trong Alpha", intro="Cảm ơn bạn đã tham gia TradeBlade Alpha. Đây là những gì diễn ra tiếp theo:",
   s1h="Giấy phép của bạn", s1b="Chúng tôi cấp từng giấy phép alpha thủ công. Chúng tôi sẽ gửi khóa Elite đầy đủ của bạn đến địa chỉ này trong thời gian ngắn, thường trong vòng một ngày.",
   s2h="Cách chúng tôi liên hệ với bạn", s2b="Chúng tôi phát hành các bản dựng và bản sửa lỗi alpha nhanh chóng và đôi khi cần liên hệ với bạn gấp. Hãy trả lời email này kèm số điện thoại nếu bạn muốn chúng tôi nhắn tin; nếu không, chúng tôi giữ mọi thứ qua email.",
   s3h="Điều chúng tôi mong muốn", s3b="Đây là bản phát hành sớm, nên hãy lường trước những điểm còn thô và cho chúng tôi biết bạn gặp phải điều gì. Mức độ bạn sử dụng và giúp định hình nó quyết định bậc mà bạn giữ khi ra mắt, và quyền truy cập không bao giờ bị cắt đột ngột: bạn tụt xuống ít nhất là bậc miễn phí.",
   reach="Liên hệ với chúng tôi bất cứ lúc nào: trả lời tại đây hoặc support@tradebladehq.com.", unsub="Hủy đăng ký",
   bh3="Muốn tham gia Alpha?", bp="Toàn quyền truy cập Elite, miễn phí, trước khi ra mắt công khai - bạn chỉ cần giơ tay.", ba="Tham gia Alpha &rarr;"),
}

BUTTON = """    <!-- Alpha opt-in -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border:1px solid #f97316;border-radius:8px;margin:0 0 32px;">
    <tr><td style="padding:24px;text-align:center;">
      <h3 style="margin:0 0 10px;color:#f97316;font-size:16px;font-weight:600;">__BH3__</h3>
      <p style="margin:0 0 18px;color:#d4d4d4;font-size:14px;line-height:1.6;">__BP__</p>
      <table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td style="background:#f97316;border-radius:8px;">
        <a href="{{ALPHA_OPTIN_URL}}" style="display:inline-block;padding:14px 32px;color:#fff;font-size:16px;font-weight:600;text-decoration:none;">__BA__</a>
      </td></tr></table>
    </td></tr>
    </table>

"""

def alpha_html(lang, d):
    dir_attr = 'rtl' if lang in RTL else 'ltr'
    tpl = """<!DOCTYPE html>
<html lang="__LANG__" dir="__DIR__"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;"><tr><td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;overflow:hidden;">
  <tr><td style="background:linear-gradient(135deg,#f97316,#ea580c);padding:32px 40px;text-align:center;">
    <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;">__H1__</h1>
  </td></tr>
  <tr><td style="padding:40px;">
    <p style="margin:0 0 24px;color:#d4d4d4;font-size:15px;line-height:1.7;">__INTRO__</p>
    <h3 style="margin:0 0 6px;color:#f97316;font-size:13px;text-transform:uppercase;letter-spacing:1px;">__S1H__</h3>
    <p style="margin:0 0 20px;color:#a3a3a3;font-size:14px;line-height:1.6;">__S1B__</p>
    <h3 style="margin:0 0 6px;color:#f97316;font-size:13px;text-transform:uppercase;letter-spacing:1px;">__S2H__</h3>
    <p style="margin:0 0 20px;color:#a3a3a3;font-size:14px;line-height:1.6;">__S2B__</p>
    <h3 style="margin:0 0 6px;color:#f97316;font-size:13px;text-transform:uppercase;letter-spacing:1px;">__S3H__</h3>
    <p style="margin:0 0 24px;color:#a3a3a3;font-size:14px;line-height:1.6;">__S3B__</p>
    <p style="margin:0;color:#a3a3a3;font-size:14px;line-height:1.6;">__REACH__</p>
  </td></tr>
  <tr><td style="padding:24px 40px;border-top:1px solid #222;">
    <p style="margin:0;color:#525252;font-size:11px;text-align:center;">&copy; 2025 TradeBlade &mdash; <a href="https://tradebladehq.com" style="color:#525252;">tradebladehq.com</a><br/><a href="{{UNSUBSCRIBE_URL}}" style="color:#404040;">__UNSUB__</a></p>
  </td></tr>
</table></td></tr></table></body></html>
"""
    rep = {'__LANG__': lang, '__DIR__': dir_attr, '__H1__': d['h1'], '__INTRO__': d['intro'],
           '__S1H__': d['s1h'], '__S1B__': d['s1b'], '__S2H__': d['s2h'], '__S2B__': d['s2b'],
           '__S3H__': d['s3h'], '__S3B__': d['s3b'], '__REACH__': d['reach'], '__UNSUB__': d['unsub']}
    for k, v in rep.items():
        tpl = tpl.replace(k, v)
    return tpl

done = []
for lang, d in T.items():
    book = os.path.join(HERE, f"{lang}.html")
    if not os.path.exists(book):
        print(f"SKIP {lang}: no book template"); continue
    with open(book, encoding='utf-8') as f:
        html = f.read()
    if 'ALPHA_OPTIN_URL' in html:
        print(f"skip button {lang}: already present")
    else:
        btn = BUTTON.replace('__BH3__', d['bh3']).replace('__BP__', d['bp']).replace('__BA__', d['ba'])
        html = html.replace('<!-- Footer -->', btn + '  <!-- Footer -->', 1)
        with open(book, 'w', encoding='utf-8', newline='') as f:
            f.write(html)
    with open(os.path.join(HERE, f"alpha-{lang}.html"), 'w', encoding='utf-8', newline='') as f:
        f.write(alpha_html(lang, d))
    done.append(lang)

print("done:", " ".join(done))
print("\n--- getAlphaSubject map (paste into worker.js) ---")
for lang, d in T.items():
    print(f"    '{lang}': {d['subj']!r},")
