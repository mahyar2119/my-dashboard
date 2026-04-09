/* ============================================================
   i18n.js — Language switcher: English / Persian (Farsi)
   ============================================================ */

const I18n = (() => {
  'use strict';

  let currentLang = 'en';

  /**
   * Apply the selected language to all elements
   * that have data-en / data-fa attributes.
   */
  function apply(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-fa', lang === 'fa');
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.dir = lang === 'fa' ? 'rtl' : 'ltr';

    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.textContent = text;
    });

    // Update toggle label
    const label = document.getElementById('lang-label');
    if (label) label.textContent = lang === 'en' ? 'FA' : 'EN';

    // Persist
    try { localStorage.setItem('op_lang', lang); } catch(e) {}
  }

  function toggle() {
    apply(currentLang === 'en' ? 'fa' : 'en');
  }

  function init() {
    // Restore saved preference
    let saved = 'en';
    try { saved = localStorage.getItem('op_lang') || 'en'; } catch(e) {}
    apply(saved);

    const btn = document.getElementById('lang-toggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, apply, toggle, get: () => currentLang };
})();
