/* ============================================================
   Opofinance Support Dashboard — app.js
   ============================================================ */

'use strict';

/* ============================================================
   SCREEN NAVIGATION
   ============================================================ */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function (s) {
    s.classList.remove('active');
  });
  var target = document.getElementById(id);
  if (target) target.classList.add('active');
}

/* ============================================================
   LOGIN
   ============================================================ */

function initLogin() {
  document.getElementById('login-btn').addEventListener('click', function () {
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
   SIGN UP
   ============================================================ */

function initSignup() {
  document.getElementById('signup-btn').addEventListener('click', function () {
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
  document.getElementById('logout-btn').addEventListener('click', function () {
    showScreen('login-screen');
  });
}

/* ============================================================
   SWITCH LINKS (Login ↔ Sign Up)
   ============================================================ */

function initSwitchLinks() {
  document.getElementById('go-signup').addEventListener('click', function () {
    showScreen('signup-screen');
  });
  document.getElementById('go-login').addEventListener('click', function () {
    showScreen('login-screen');
  });
}

/* ============================================================
   SIDEBAR NAV — active state
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
   DARK / LIGHT MODE TOGGLE
   ============================================================ */

function initThemeToggle() {
  var btn    = document.getElementById('theme-toggle');
  var icon   = btn.querySelector('.toggle-icon');
  var label  = btn.querySelector('.toggle-label');
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

/* ============================================================
   INIT — run all on DOM ready
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initLogin();
  initSignup();
  initLogout();
  initSwitchLinks();
  initNavItems();
  initThemeToggle();
});
