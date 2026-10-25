(function () {
  'use strict';

  // Demo accounts persist in this browser, even after closing the tab/browser.
  // Use the same browser and the same site address each time (e.g. Live Server).
  const ACCOUNTS_KEY = 'learnmate_demo_accounts';
  const SESSION_KEY = 'learnmate_demo_session';
  const LAST_EMAIL_KEY = 'learnmate_last_email';
  let mode = 'login';
  const $ = id => document.getElementById(id);

  function getAccounts() {
    try {
      const saved = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
      return saved && typeof saved === 'object' ? saved : {};
    } catch (error) {
      return {};
    }
  }

  function showMessage(message) {
    $('auth-message').textContent = message;
  }

  function setMode(nextMode) {
    mode = nextMode;
    $('auth-title').textContent = mode === 'login' ? 'Log in to LearnMate' : 'Create your LearnMate account';
    $('auth-description').textContent = mode === 'login'
      ? 'Welcome back! Use the account you created before.'
      : 'Create your account once. LearnMate will save it in this browser for next time.';
    $('auth-submit').textContent = mode === 'login' ? 'Log in' : 'Create account';
    $('name-field').hidden = mode === 'login';
    $('full-name').required = mode === 'register';
    $('switch-copy').textContent = mode === 'login' ? "Don't have an account?" : 'Already have an account?';
    $('switch-mode').textContent = mode === 'login' ? 'Create account' : 'Log in';
    $('password').autocomplete = mode === 'login' ? 'current-password' : 'new-password';
    showMessage('');
  }

  $('switch-mode').addEventListener('click', function () {
    setMode(mode === 'login' ? 'register' : 'login');
  });

  $('auth-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = $('email').value.trim().toLowerCase();
    const password = $('password').value;
    const name = $('full-name').value.trim();
    const accountList = getAccounts();

    if (!email || !password) {
      showMessage('Please enter your email/username and password.');
      return;
    }

    if (mode === 'register') {
      if (!name) {
        showMessage('Please enter your name.');
        return;
      }
      if (accountList[email]) {
        showMessage('This account already exists. Please log in instead—there is no need to create it again.');
        setMode('register');
        return;
      }

      accountList[email] = { password: password, name: name };
      try {
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accountList));
        localStorage.setItem(LAST_EMAIL_KEY, email);
        localStorage.setItem(SESSION_KEY, JSON.stringify({ id: email, name: name }));
        // Only initialize learning data when it does not already exist.
        if (!localStorage.getItem('learnmate_v1')) {
          localStorage.setItem('learnmate_v1', JSON.stringify({
            name: name,
            completedModules: [],
            completedActivities: [],
            activityDrafts: {},
            quizResults: [],
            points: 0,
            capstone: {},
            capstoneComplete: false
          }));
        }
      } catch (error) {
        showMessage('Your browser could not save the account. Please enable site storage and try again.');
        return;
      }
      window.location.href = 'modules.html';
      return;
    }

    const account = accountList[email];
    if (!account) {
      showMessage('We could not find an account with that email/username. Choose “Create account” only if you have never registered in this browser.');
      return;
    }
    if (account.password !== password) {
      showMessage('That password is incorrect. Please try again.');
      return;
    }

    try {
      localStorage.setItem(LAST_EMAIL_KEY, email);
      localStorage.setItem(SESSION_KEY, JSON.stringify({ id: email, name: account.name }));
      let state = {};
      try { state = JSON.parse(localStorage.getItem('learnmate_v1') || '{}') || {}; } catch (error) { state = {}; }
      state.name = account.name;
      localStorage.setItem('learnmate_v1', JSON.stringify(state));
    } catch (error) {
      showMessage('Your browser could not save the login session. Please enable site storage and try again.');
      return;
    }
    window.location.href = 'modules.html';
  });

  // Remember the email only; never save or autofill the password.
  try {
    $('email').value = localStorage.getItem(LAST_EMAIL_KEY) || '';
  } catch (error) {}
  setMode('login');
})();
