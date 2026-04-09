/* ============================================================
   animations.js — Count-up, bar fills, entrance animations
   ============================================================ */

const Animations = (() => {
  'use strict';

  /**
   * Animates a number from 0 to its target value.
   * Reads data-count and optional data-suffix attributes.
   */
  function countUp(elements) {
    if (!elements || !elements.length) return;

    elements.forEach(el => {
      const target   = parseInt(el.getAttribute('data-count'), 10);
      const suffix   = el.getAttribute('data-suffix') || '';
      const duration = 1200; // ms
      const start    = performance.now();

      // Skip non-number metric values (e.g., "KYC")
      if (isNaN(target)) return;

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  /**
   * Animates progress bars from 0 to their target width.
   * Reads data-width or --fill CSS variable.
   */
  function animateBars(elements) {
    if (!elements || !elements.length) return;

    elements.forEach((bar, i) => {
      const targetWidth = bar.getAttribute('data-width')
        || getComputedStyle(bar).getPropertyValue('--fill').trim()
        || '0%';

      // Reset
      bar.style.width = '0%';

      // Animate with stagger
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 100 + i * 80);
    });
  }

  /**
   * Run entrance animations for the dashboard.
   * Called once after login.
   */
  function enterDashboard() {
    const activePage = document.querySelector('.page.active');
    if (!activePage) return;

    // Count up all metric values on current page
    countUp(activePage.querySelectorAll('[data-count]'));

    // Animate all bars on current page
    animateBars(activePage.querySelectorAll('.bar-fill'));
  }

  /**
   * Observe pages as they become active and trigger animations.
   * Uses MutationObserver to watch class changes.
   */
  function watchPages() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target;
          if (el.classList.contains('page') && el.classList.contains('active')) {
            // Small delay to allow CSS transition to begin
            setTimeout(() => {
              countUp(el.querySelectorAll('[data-count]'));
              animateBars(el.querySelectorAll('.bar-fill'));
            }, 50);
          }
        }
      });
    });

    document.querySelectorAll('.page').forEach(page => {
      observer.observe(page, { attributes: true });
    });
  }

  function init() {
    watchPages();
  }

  return { init, countUp, animateBars, enterDashboard };
})();
