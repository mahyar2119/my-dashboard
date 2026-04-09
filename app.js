const loginPage     = document.getElementById('loginPage');
const signupPage    = document.getElementById('signupPage');
const dashboardPage = document.getElementById('dashboardPage');
const pageTitle     = document.getElementById('pageTitle');

function showPage(page) {
  [loginPage, signupPage, dashboardPage].forEach(p => p.classList.add('hidden'));
  page.classList.remove('hidden');
}

function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const target = document.getElementById('section-' + name);
  if (target) target.classList.remove('hidden');
  pageTitle.textContent = name;
}

// Login
document.getElementById('loginBtn').addEventListener('click', function () {
  const email = document.getElementById('loginEmail').value.trim();
  const pass  = document.getElementById('loginPass').value.trim();
  if (!email || !pass) { alert('Please enter your email and password.'); return; }
  showPage(dashboardPage);
  showSection('Dashboard');
});

// Sign Up
document.getElementById('signupBtn').addEventListener('click', function () {
  const name  = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass  = document.getElementById('signupPass').value.trim();
  if (!name || !email || !pass) { alert('Please fill in all fields.'); return; }
  showPage(dashboardPage);
  showSection('Dashboard');
});

// Switch auth pages
document.getElementById('goSignup').addEventListener('click', function () { showPage(signupPage); });
document.getElementById('goLogin').addEventListener('click', function ()   { showPage(loginPage); });

// Logout
document.getElementById('logoutBtn').addEventListener('click', function () { showPage(loginPage); });

// Sidebar navigation
document.querySelectorAll('.nav-item[data-page]').forEach(function (item) {
  item.addEventListener('click', function () {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    showSection(item.getAttribute('data-page'));
  });
});
