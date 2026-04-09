/* ============================================================
   theme.js — Dark / Light mode toggle
   ============================================================ */

const Theme = (() => {
  'use strict';

  let isDark = false;

  function apply(dark) {
    isDark = dark;
    document.body.classList.toggle('theme-dark', dark);
    document.body.classList.toggle('theme-light', !dark);

    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = dark ? '☀️' : '🌙';

    try { localStorage.setItem('op_theme', dark ? 'dark' : 'light'); } catch(e) {}
  }

  function toggle() {
    apply(!isDark);
  }

  function init() {
    // Restore saved theme
    let saved = 'light';
    try { saved = localStorage.getItem('op_theme') || 'light'; } catch(e) {}
    apply(saved === 'dark');

    const btn = document.getElementById('theme-toggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, toggle, isDark: () => isDark };
})();
