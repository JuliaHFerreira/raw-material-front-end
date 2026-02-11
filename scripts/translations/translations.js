// scripts/translations/translations.js (engine)

const translations = window.TRANSLATIONS || {};
let currentLang = 'en';

function normalizeLang(lang) {
  if (!lang) return 'pt';
  const l = String(lang).toLowerCase();

  if (l === 'pt-br' || l === 'ptbr' || l.startsWith('pt')) return 'pt';
  if (l === 'en-us' || l === 'enus' || l.startsWith('en')) return 'en';

  return lang;
}

function translate(key) {
  const dict = translations[currentLang] || {};
  return dict[key] || key;
}

function updateTranslations() {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    element.textContent = translate(key);
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    element.placeholder = translate(key);
  });

  document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en-US';
  document.body.setAttribute('data-lang', currentLang);
}

function changeLanguage(lang) {
  currentLang = normalizeLang(lang);
  localStorage.setItem('preferredLanguage', currentLang);
  updateTranslations();

  document.querySelectorAll('.language-button').forEach(btn => {
    btn.classList.toggle('active', normalizeLang(btn.getAttribute('data-lang')) === currentLang);
  });
}

// expõe global (pra app.js/ui.js usar)
window.translate = translate;
window.changeLanguage = changeLanguage;
window.updateTranslations = updateTranslations;

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);


  document.querySelectorAll('.language-button').forEach(button => {
    button.addEventListener('click', () => {
      changeLanguage(button.getAttribute('data-lang'));
    });
  });
});
