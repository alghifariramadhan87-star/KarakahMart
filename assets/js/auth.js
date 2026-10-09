(function () {
  'use strict';

  var accountsKey = 'karakahmart-demo-accounts-v1';
  var sessionKey = 'karakahmart-demo-session-v1';
  var hashIterations = 210000;
  var loginView = document.getElementById('loginView');
  var registerView = document.getElementById('registerView');
  var accountView = document.getElementById('accountView');
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');
  var forgotForm = document.getElementById('forgotForm');
  var loginFeedback = document.getElementById('loginFeedback');
  var registerFeedback = document.getElementById('registerFeedback');
  var forgotFeedback = document.getElementById('forgotFeedback');

  function readAccounts() {
    var raw = localStorage.getItem(accountsKey);
    if (raw === null) return [];

    var accounts;
    try {
      accounts = JSON.parse(raw);
    } catch (error) {
      console.error('Data akun lokal tidak dapat dibaca.', error);
      throw new Error('Data akun lokal rusak. Hapus data situs KarakahMart lalu coba lagi.');
    }

    if (!Array.isArray(accounts) || accounts.some(function (account) {
      return !account || typeof account.id !== 'string' || typeof account.name !== 'string'
        || typeof account.email !== 'string' || typeof account.salt !== 'string'
        || typeof account.passwordHash !== 'string' || account.iterations !== hashIterations;
    })) {
      throw new Error('Format data akun lokal tidak valid. Hapus data situs KarakahMart lalu coba lagi.');
    }
    return accounts;
  }

  function getSession() {
    var raw = localStorage.getItem(sessionKey) || sessionStorage.getItem(sessionKey);
    if (raw === null) return null;
    try {
      var session = JSON.parse(raw);
      if (!session || typeof session.accountId !== 'string') {
        throw new Error('Format sesi akun lokal tidak valid.');
      }
      return session;
    } catch (error) {
      localStorage.removeItem(sessionKey);
      console.error('Sesi akun lokal tidak dapat dibaca dan telah dihapus.', error);
      return null;
    }
  }

  function encodeBase64(bytes) {
    var binary = '';
    bytes.forEach(function (byte) { binary += String.fromCharCode(byte); });
    return window.btoa(binary);
  }

  function decodeBase64(value) {
    var binary = window.atob(value);
    var bytes = new Uint8Array(binary.length);
    for (var index = 0; index < binary.length; index++) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }

  async function derivePasswordHash(password, salt, iterations) {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error('Fitur keamanan browser tidak tersedia. Jalankan situs melalui localhost.');
    }
    var key = await window.crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    var hash = await window.crypto.subtle.deriveBits({
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: 'SHA-256'
    }, key, 256);
    return new Uint8Array(hash);
  }

  function createId() {
    var bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return encodeBase64(bytes);
  }

  function setFeedback(node, message) {
    node.textContent = message;
    node.hidden = !message;
  }

  function setBusy(form, busy) {
    var button = form.querySelector('button[type="submit"]');
    button.disabled = busy;
    var idleLabel = {
      loginForm: 'Masuk',
      registerForm: 'Buat akun',
      forgotForm: 'Simpan kata sandi baru'
    }[form.id];
    button.textContent = busy ? 'Memproses...' : idleLabel;
  }

  function showView(viewName) {
    loginView.hidden = viewName !== 'login';
    registerView.hidden = viewName !== 'register';
    document.getElementById('forgotView').hidden = viewName !== 'forgot';
    setFeedback(loginFeedback, '');
    setFeedback(registerFeedback, '');
    setFeedback(forgotFeedback, '');
    var focusTarget = {
      login: document.getElementById('loginEmail'),
      register: document.getElementById('registerName'),
      forgot: document.getElementById('forgotEmail')
    }[viewName];
    focusTarget.focus();
  }

  function renderAccount() {
    var accounts = readAccounts();
    var session = getSession();
    var account = session && accounts.find(function (entry) { return entry.id === session.accountId; });

    document.querySelectorAll('[data-account-link]').forEach(function (link) {
      var label = link.querySelector('[data-account-label]');
      if (!label) return;
      var next = window.location.pathname + window.location.search + window.location.hash;
      link.href = 'login.html?next=' + encodeURIComponent(next);
      if (account) {
        label.textContent = account.name.split(/\s+/)[0];
        link.setAttribute('aria-label', 'Akun ' + account.name);
      } else {
        label.textContent = 'Masuk';
        link.setAttribute('aria-label', 'Masuk ke akun KarakahMart');
      }
    });

    if (!loginView) return;
    if (account) {
      document.getElementById('authForms').hidden = true;
      accountView.hidden = false;
      document.getElementById('accountGreeting').textContent = 'Halo, ' + account.name + '. Anda masuk dengan ' + account.email + '.';
    } else {
      document.getElementById('authForms').hidden = false;
      accountView.hidden = true;
      showView(new URLSearchParams(window.location.search).get('mode') === 'register' ? 'register' : 'login');
    }
  }

  try {
    renderAccount();
  } catch (error) {
    console.error('Data akun tidak dapat dimuat.', error);
    if (loginView) {
      setFeedback(loginFeedback, error.message || 'Data akun lokal tidak dapat dimuat.');
    }
  }

  if (!loginView) return;

  document.querySelectorAll('[data-show-view]').forEach(function (button) {
    button.addEventListener('click', function () {
      showView(button.dataset.showView);
    });
  });

  document.querySelectorAll('[data-password-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var input = document.getElementById(button.dataset.passwordToggle);
      var reveal = input.type === 'password';
      input.type = reveal ? 'text' : 'password';
      button.setAttribute('aria-label', reveal ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
      button.querySelector('i').className = reveal ? 'ph ph-eye-slash' : 'ph ph-eye';
    });
  });

  document.getElementById('registerConfirmPassword').addEventListener('input', function (event) {
    var password = document.getElementById('registerPassword');
    event.currentTarget.setCustomValidity(
      event.currentTarget.value && event.currentTarget.value !== password.value
        ? 'Kata sandi belum sama.'
        : ''
    );
  });

  document.getElementById('registerPassword').addEventListener('input', function () {
    var confirm = document.getElementById('registerConfirmPassword');
    if (confirm.value) {
      confirm.setCustomValidity(confirm.value === this.value ? '' : 'Kata sandi belum sama.');
    }
  });

  document.getElementById('forgotConfirmPassword').addEventListener('input', function (event) {
    var password = document.getElementById('forgotPassword');
    event.currentTarget.setCustomValidity(
      event.currentTarget.value && event.currentTarget.value !== password.value
        ? 'Kata sandi belum sama.'
        : ''
    );
  });

  document.getElementById('forgotPassword').addEventListener('input', function () {
    var confirm = document.getElementById('forgotConfirmPassword');
    if (confirm.value) {
      confirm.setCustomValidity(confirm.value === this.value ? '' : 'Kata sandi belum sama.');
    }
  });

  loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!loginForm.reportValidity()) return;
    setFeedback(loginFeedback, '');
    setBusy(loginForm, true);
    try {
      var formData = new FormData(loginForm);
      var email = String(formData.get('email')).trim().toLocaleLowerCase('id');
      var accounts = readAccounts();
      var account = accounts.find(function (entry) { return entry.email === email; });
      if (!account) {
        setFeedback(loginFeedback, 'Email atau kata sandi tidak cocok.');
        return;
      }
      var candidate = await derivePasswordHash(
        String(formData.get('password')),
        decodeBase64(account.salt),
        account.iterations
      );
      if (encodeBase64(candidate) !== account.passwordHash) {
        setFeedback(loginFeedback, 'Email atau kata sandi tidak cocok.');
        return;
      }
      var session = JSON.stringify({ accountId: account.id });
      if (document.getElementById('rememberMe').checked) {
        localStorage.setItem(sessionKey, session);
        sessionStorage.removeItem(sessionKey);
      } else {
        sessionStorage.setItem(sessionKey, session);
        localStorage.removeItem(sessionKey);
      }
      window.location.href = getReturnUrl();
    } catch (error) {
      console.error('Proses masuk akun gagal.', error);
      setFeedback(loginFeedback, error.message || 'Akun tidak dapat dibuka. Periksa penyimpanan browser lalu coba lagi.');
    } finally {
      setBusy(loginForm, false);
    }
  });

  registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!registerForm.reportValidity()) return;
    setFeedback(registerFeedback, '');
    setBusy(registerForm, true);
    try {
      var formData = new FormData(registerForm);
      var name = String(formData.get('name')).trim();
      var email = String(formData.get('email')).trim().toLocaleLowerCase('id');
      var password = String(formData.get('password'));
      var accounts = readAccounts();
      if (accounts.some(function (account) { return account.email === email; })) {
        setFeedback(registerFeedback, 'Email ini sudah terdaftar. Silakan masuk atau gunakan email lain.');
        return;
      }

      var salt = new Uint8Array(16);
      window.crypto.getRandomValues(salt);
      var passwordHash = await derivePasswordHash(password, salt, hashIterations);
      var account = {
        id: createId(),
        name: name,
        email: email,
        salt: encodeBase64(salt),
        passwordHash: encodeBase64(passwordHash),
        iterations: hashIterations,
        createdAt: new Date().toISOString()
      };
      accounts.push(account);
      localStorage.setItem(accountsKey, JSON.stringify(accounts));
      localStorage.setItem(sessionKey, JSON.stringify({ accountId: account.id }));
      window.location.href = getReturnUrl();
    } catch (error) {
      console.error('Pendaftaran akun gagal.', error);
      setFeedback(registerFeedback, error.message || 'Akun tidak dapat dibuat. Periksa penyimpanan browser lalu coba lagi.');
    } finally {
      setBusy(registerForm, false);
    }
  });

  forgotForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!forgotForm.reportValidity()) return;
    setFeedback(forgotFeedback, '');
    setBusy(forgotForm, true);
    try {
      var formData = new FormData(forgotForm);
      var email = String(formData.get('email')).trim().toLocaleLowerCase('id');
      var accounts = readAccounts();
      var account = accounts.find(function (entry) { return entry.email === email; });
      if (!account) {
        setFeedback(forgotFeedback, 'Akun dengan email tersebut tidak ditemukan di browser ini.');
        return;
      }

      var salt = new Uint8Array(16);
      window.crypto.getRandomValues(salt);
      var passwordHash = await derivePasswordHash(String(formData.get('password')), salt, hashIterations);
      account.salt = encodeBase64(salt);
      account.passwordHash = encodeBase64(passwordHash);
      account.iterations = hashIterations;
      localStorage.setItem(accountsKey, JSON.stringify(accounts));
      sessionStorage.removeItem(sessionKey);
      localStorage.removeItem(sessionKey);
      forgotForm.reset();
      showView('login');
      document.getElementById('loginEmail').value = email;
      setFeedback(loginFeedback, 'Kata sandi berhasil diperbarui. Silakan masuk dengan kata sandi baru.');
    } catch (error) {
      console.error('Pemulihan kata sandi akun gagal.', error);
      setFeedback(forgotFeedback, error.message || 'Kata sandi tidak dapat diperbarui. Periksa penyimpanan browser lalu coba lagi.');
    } finally {
      setBusy(forgotForm, false);
    }
  });

  document.getElementById('logoutButton').addEventListener('click', function () {
    try {
      localStorage.removeItem(sessionKey);
      sessionStorage.removeItem(sessionKey);
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Gagal keluar dari akun.', error);
      document.getElementById('accountGreeting').textContent = 'Akun tidak dapat dikeluarkan. Periksa pengaturan penyimpanan browser.';
    }
  });

  function getReturnUrl() {
    var destination = new URLSearchParams(window.location.search).get('next');
    if (!destination) return 'index.html';
    var url = new URL(destination, window.location.href);
    if (url.origin !== window.location.origin || /\/login\.html$/.test(url.pathname)) return 'index.html';
    return url.pathname + url.search + url.hash;
  }

})();
