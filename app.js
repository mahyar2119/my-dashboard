/* ============================================
   Opofinance Support Dashboard — app.js
   ============================================ */

'use strict';

/* ── SCREEN NAVIGATION ── */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(function(screen) {
    screen.classList.remove('active');
  });
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

function showDashboard() {
  showScreen('dashboard-screen');
}

function showLogin() {
  showScreen('login-screen');
}

function showSignup() {
  showScreen('signup-screen');
}

/* ── SIDEBAR NAV ACTIVE STATE ── */

function initNavItems() {
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(function(n) {
        n.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

/* ── LOGIN FORM VALIDATION ── */

function initLoginForm() {
  const loginBtn = document.getElementById('login-btn');
  if (!loginBtn) return;

  loginBtn.addEventListener('click', function() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }

    showDashboard();
  });
}

/* ── SIGNUP FORM VALIDATION ── */

function initSignupForm() {
  const signupBtn = document.getElementById('signup-btn');
  if (!signupBtn) return;

  signupBtn.addEventListener('click', function() {
    const name     = document.getElementById('signup-name').value.trim();
    const email    = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    showDashboard();
  });
}

/* ── LOGOUT ── */

function initLogout() {
  document.querySelectorAll('.logout-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      showLogin();
    });
  });
}

/* ── INIT ── */

document.addEventListener('DOMContentLoaded', function() {
  initNavItems();
  initLoginForm();
  initSignupForm();
  initLogout();
});

/* ── LINK CLICKS (go-signup / go-login) ── */
document.addEventListener('DOMContentLoaded', function() {
  const goSignup = document.getElementById('go-signup');
  if (goSignup) goSignup.addEventListener('click', showSignup);

  const goLogin = document.getElementById('go-login');
  if (goLogin) goLogin.addEventListener('click', showLogin);
});
