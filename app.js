/* ============================================================
   app.js — Main entry point
   Initializes all modules in the correct order.
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Theme (dark/light) — must be first to avoid flash */
  Theme.init();

  /* 2. Language (EN/FA + RTL) */
  I18n.init();

  /* 3. Navigation — screens + pages + sidebar + mobile */
  Nav.init();

  /* 4. Animations — count-up, bar fills, page watch */
  Animations.init();

  /* 5. Charts — Chart.js animated charts */
  Charts.init();

  /* ── Initial state: show login screen ── */
  // (already set by .screen.active in HTML)

});
