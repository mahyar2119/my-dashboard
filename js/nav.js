/* ============================================================
   nav.js — Screen switching, page routing, sidebar, mobile
   ============================================================ */

const Nav = (() => {
  'use strict';

  /* ── Screen navigation ── */
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }

  /* ── Page navigation ── */
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
      // Trigger number animations on page switch
      Animations.countUp(el.querySelectorAll('[data-count]'));
      Animations.animateBars(el.querySelectorAll('.bar-fill'));
      // Trigger chart re-render if needed
      if (typeof Charts !== 'undefined') Charts.renderVisible();
    }

    // Update topbar title
    const navItem = document.querySelector(`.nav-item[data-page="${id}"]`);
    const titleEl = document.getElementById('topbar-title');
    if (navItem && titleEl) {
      const label = navItem.querySelector('.nav-label');
      if (label) {
        titleEl.querySelector('.page-title-text').textContent = label.textContent.trim();
      }
    }

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (navItem) navItem.classList.add('active');

    // Close sidebar on mobile
    closeSidebar();
    // Scroll to top
    const pagesWrap = document.querySelector('.pages-wrap');
    if (pagesWrap) pagesWrap.scrollTop = 0;
  }

  /* ── Sidebar (mobile) ── */
  let overlay = null;

  function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  /* ── Init ── */
  function init() {
    // Create mobile overlay
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeSidebar);

    // Login button
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        const email    = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        if (!email || !password) {
          alert('Please enter your email and password.');
          return;
        }
        showScreen('screen-dashboard');
        showPage('page-dashboard');
        // Trigger entrance animations
        setTimeout(() => Animations.enterDashboard(), 100);
      });
    }

    // Signup button
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        const name     = document.getElementById('signup-name').value.trim();
        const email    = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value.trim();
        if (!name || !email || !password) {
          alert('Please fill in all fields.');
          return;
        }
        showScreen('screen-dashboard');
        showPage('page-dashboard');
        setTimeout(() => Animations.enterDashboard(), 100);
      });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => showScreen('screen-login'));
    }

    // Auth switch links
    const goSignup = document.getElementById('go-signup');
    if (goSignup) goSignup.addEventListener('click', () => showScreen('screen-signup'));

    const goLogin = document.getElementById('go-login');
    if (goLogin) goLogin.addEventListener('click', () => showScreen('screen-login'));

    // Logo button → dashboard home
    const logoBtn = document.getElementById('logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', () => showPage('page-dashboard'));
    }

    // Avatar button → profile page
    const avatarBtn = document.getElementById('avatar-btn');
    if (avatarBtn) {
      avatarBtn.addEventListener('click', () => showPage('page-profile'));
    }

    // Nav items
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      item.addEventListener('click', function() {
        const pageId = this.getAttribute('data-page');
        if (pageId) showPage(pageId);
      });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    // Keyboard: Escape closes sidebar
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSidebar();
    });
  }

  return { init, showScreen, showPage };
})();
