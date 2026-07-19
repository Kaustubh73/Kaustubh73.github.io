/*
 * Theme toggle + back-to-top, adapted from the Academic-Homepage-Template
 * (https://github.com/Arvid-pku/Academic-Homepage-Template) by Xunjian Yin.
 * Released as "free to use for personal and academic homepages; attribution
 * appreciated but not required."
 */

(function () {
  // ---- Dark mode ----
  var themeToggle = document.getElementById('theme-toggle');

  function getStoredTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }
  function setStoredTheme(theme) {
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  function updateThemeIcon(theme) {
    var isDark = theme === 'dark';
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.innerHTML = isDark
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  if (themeToggle) {
    var currentTheme = getStoredTheme() ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function () {
      var newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      setStoredTheme(newTheme);
      updateThemeIcon(newTheme);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!getStoredTheme()) {
        var newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
      }
    });
  }

  // ---- Back to top ----
  var backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) backToTopBtn.classList.add('visible');
      else backToTopBtn.classList.remove('visible');
    });
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Footer year ----
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- BibTeX modal ----
  var modal = document.getElementById('bib-modal');
  var modalText = document.getElementById('bib-modal-text');
  var modalTitle = document.getElementById('bib-modal-title');
  var copyBtn = document.getElementById('bib-copy');
  var lastFocused = null;

  function openModal(title, bibtex) {
    if (!modal) return;
    modalTitle.textContent = title && title.length > 60 ? title.slice(0, 57) + '…' : (title || 'BibTeX');
    modalText.textContent = bibtex || '';
    copyBtn.textContent = 'Copy to clipboard';
    copyBtn.classList.remove('copied');
    modal.hidden = false;
    lastFocused = document.activeElement;
    copyBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll('.bib-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var title = btn.getAttribute('data-title') || '';
      var entries = window.BIBTEX_ENTRIES || {};
      openModal(title, entries[title] || '');
    });
  });

  if (modal) {
    modal.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
    copyBtn.addEventListener('click', function () {
      var text = modalText.textContent;
      var done = function () {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }
})();
