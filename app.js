/* ============================================================
   Opofinance Support Dashboard
   app.js — all interactivity and button logic
   ============================================================ */

'use strict';

/* ============================================================
   SCREEN NAVIGATION
   ============================================================ */

/**
 * Hide all screens and show the one with the given id.
 * @param {string} id - The id of the screen to show.
 */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (screen) {
    screen.classList.remove('active');
  });

  var target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }
}

/* ============================================================
   AUTH — LOGIN
   ============================================================ */

function initLogin() {
  var loginBtn = document.getElementById('login-btn');
  if (!loginBtn) return;

  loginBtn.addEventListener('click', function () {
    var email    = document.getElementById('login-email').value.trim();
    var password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }

    showScreen('dashboard-screen');
  });
}

/* ============================================================
   AUTH — SIGN UP
   ============================================================ */

function initSignup() {
  var signupBtn = document.getElementById('signup-btn');
  if (!signupBtn) return;

  signupBtn.addEventListener('click', function () {
    var name     = document.getElementById('signup-name').value.trim();
    var email    = document.getElementById('signup-email').value.trim();
    var password = document.getElementById('signup-password').value.trim();

    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    showScreen('dashboard-screen');
  });
}

/* ============================================================
   LOGOUT
   ============================================================ */

function initLogout() {
  var logoutBtn = document.getElementById('logout-btn');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', function () {
    showScreen('login-screen');
  });
}

/* ============================================================
   SWITCH LINKS (Login ↔ Sign Up)
   ============================================================ */

function initSwitchLinks() {
  var goSignup = document.getElementById('go-signup');
  if (goSignup) {
    goSignup.addEventListener('click', function () {
      showScreen('signup-screen');
    });
  }

  var goLogin = document.getElementById('go-login');
  if (goLogin) {
    goLogin.addEventListener('click', function () {
      showScreen('login-screen');
    });
  }
}

/* ============================================================
   SIDEBAR NAVIGATION — active state
   ============================================================ */

function initNavItems() {
  document.querySelectorAll('.nav-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(function (n) {
        n.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

/* ============================================================
   INIT — run everything on DOM ready
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initLogin();
  initSignup();
  initLogout();
  initSwitchLinks();
  initNavItems();
  initThemeToggle();
});

/* ============================================================
   DARK / LIGHT MODE TOGGLE
   ============================================================ */

function initThemeToggle() {
  var btn   = document.getElementById('theme-toggle');
  var icon  = btn.querySelector('.toggle-icon');
  var label = btn.querySelector('.toggle-label');
  var isDark = false;

  btn.addEventListener('click', function () {
    isDark = !isDark;

    if (isDark) {
      document.body.classList.add('dark');
      icon.textContent  = '☀️';
      label.textContent = 'Light mode';
    } else {
      document.body.classList.remove('dark');
      icon.textContent  = '🌙';
      label.textContent = 'Dark mode';
    }
  });
}
