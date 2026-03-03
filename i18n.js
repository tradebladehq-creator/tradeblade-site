// ─── TradeBlade i18n Engine ───
// Auto-detects browser language or reads ?lang= param. No visible UI.
(function(){
  var RTL = ['ar','he','ur','fa'];
  var LANGS = {
    en:'English',es:'Español','zh-CN':'\u7b80\u4f53\u4e2d\u6587','zh-TW':'\u7e41\u9ad4\u4e2d\u6587',
    ja:'\u65e5\u672c\u8a9e',ko:'\ud55c\uad6d\uc5b4',fr:'Fran\u00e7ais',de:'Deutsch',
    pt:'Portugu\u00eas',it:'Italiano',nl:'Nederlands',ru:'\u0420\u0443\u0441\u0441\u043a\u0438\u0439',
    pl:'Polski',cs:'\u010ce\u0161tina',tr:'T\u00fcrk\u00e7e',ar:'\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
    he:'\u05e2\u05d1\u05e8\u05d9\u05ea',ur:'\u0627\u0631\u062f\u0648',fa:'\u0641\u0627\u0631\u0633\u06cc',
    hi:'\u0939\u093f\u0928\u094d\u0926\u0940',bn:'\u09ac\u09be\u0982\u09b2\u09be',th:'\u0e44\u0e17\u0e22',
    vi:'Ti\u1ebfng Vi\u1ec7t',id:'Bahasa Indonesia',ms:'Bahasa Melayu',tl:'Filipino',
    sv:'Svenska',no:'Norsk',da:'Dansk',fi:'Suomi',el:'\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac',
    ro:'Rom\u00e2n\u0103',hu:'Magyar',uk:'\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430',
    hr:'Hrvatski',bg:'\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438'
  };

  var cache = {};
  var current = 'en';

  function detect(){
    // 1. ?lang= URL parameter (highest priority)
    var params = new URLSearchParams(window.location.search);
    var urlLang = params.get('lang');
    if(urlLang && LANGS[urlLang]) return urlLang;
    // 2. Browser language
    var nav = (navigator.language||'').toLowerCase();
    if(LANGS[nav]) return nav;
    if(nav==='zh' || nav.indexOf('zh-hans')===0 || nav.indexOf('zh-cn')===0) return 'zh-CN';
    if(nav.indexOf('zh-hant')===0 || nav.indexOf('zh-tw')===0) return 'zh-TW';
    var base = nav.split('-')[0];
    if(LANGS[base]) return base;
    return 'en';
  }

  function load(code, cb){
    if(code==='en'){ cb && cb(null); return; }
    if(cache[code]){ apply(cache[code], code); cb && cb(cache[code]); return; }
    fetch('lang/'+code+'.json?v=6').then(function(r){
      if(!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function(data){
      cache[code] = data;
      apply(data, code);
      cb && cb(data);
    }).catch(function(){
      console.warn('i18n: failed to load lang/'+code+'.json');
      cb && cb(null);
    });
  }

  function apply(data, code){
    if(!data) return;
    current = code;
    // Swap text on [data-i18n] elements
    var translated = 0;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      try {
        var key = el.getAttribute('data-i18n');
        var val = data[key];
        if(!val || typeof val !== 'string') return;
        if(val.indexOf('<')>=0) el.innerHTML = val;
        else el.textContent = val;
        translated++;
      } catch(e) { /* skip broken key */ }
    });
    // Nuclear fallback: translate book card by TAG NAME within #book.
    // Some browser extensions strip all custom attributes (data-*, id, style)
    // from card content. getElementsByTagName is immune to attribute stripping.
    var bookSec = document.getElementById('book');
    if(bookSec){
      var bh3 = bookSec.getElementsByTagName('h3');
      if(bh3[0] && data.book_inside_title) bh3[0].textContent = data.book_inside_title;
      var bli = bookSec.getElementsByTagName('li');
      for(var bi=0; bi<6 && bi<bli.length; bi++){
        var bk = 'book_li_'+(bi+1);
        if(data[bk]) bli[bi].textContent = data[bk];
      }
      // book_footer: first <p> after the <ul> that holds the list items
      if(bli.length && data.book_footer){
        var ul = bli[0].parentElement;
        if(ul){ var ns = ul.nextElementSibling; while(ns){ if(ns.tagName==='P'){ ns.textContent = data.book_footer; break; } ns = ns.nextElementSibling; } }
      }
    }
    // Swap placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      var key = el.getAttribute('data-i18n-placeholder');
      if(data[key]) el.placeholder = data[key];
    });
    // Page title & description
    if(data.page_title) document.title = data.page_title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if(metaDesc && data.page_description) metaDesc.setAttribute('content', data.page_description);
    // RTL
    var isRtl = RTL.indexOf(code)>=0;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl', isRtl);
    document.documentElement.lang = code;
    try { localStorage.removeItem('tb-lang'); } catch(e) {} // clean up legacy saved lang
    // Update ebook PDF link if translated version exists
    var bookLinks = document.querySelectorAll('a[href*="TheMathematicsOfSurvival"]');
    bookLinks.forEach(function(a){
      if(code==='en') a.href = 'assets/TheMathematicsOfSurvival.pdf';
      else a.href = 'assets/lang/TheMathematicsOfSurvival_'+code+'.pdf';
    });
    // Update ebook cover image to localized version
    var coverImgs = document.querySelectorAll('img[src*="ebook-cover"], img[src*="assets/covers/cover-"]');
    coverImgs.forEach(function(img){
      if(code==='en') img.src = 'assets/ebook-cover.png';
      else img.src = 'assets/covers/cover-'+code+'.jpg';
    });
  }

  // Save originals on first load
  function saveOriginals(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      if(!el.hasAttribute('data-i18n-orig')) el.setAttribute('data-i18n-orig', el.innerHTML);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      if(!el.hasAttribute('data-i18n-placeholder-orig')) el.setAttribute('data-i18n-placeholder-orig', el.placeholder);
    });
  }

  // Expose for form JS
  window.TB_I18N = {
    t: function(key){
      if(current==='en' || !cache[current]) return null;
      return cache[current][key] || null;
    },
    current: function(){ return current; },
    LANGS: LANGS
  };

  // Init
  document.addEventListener('DOMContentLoaded', function(){
    saveOriginals();
    var lang = detect();
    if(lang!=='en'){
      load(lang);
      // Safety net: re-apply at 500ms and 2s in case browser extensions modify the DOM
      setTimeout(function(){ if(cache[lang]) apply(cache[lang], lang); }, 500);
      setTimeout(function(){ if(cache[lang]) apply(cache[lang], lang); }, 2000);
    }
  });
})();
