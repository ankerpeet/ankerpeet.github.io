(function () {
  'use strict';

  // Mobile nav toggle (replaces Bootstrap's JS bundle to keep the page light)
  var toggler = document.querySelector('.navbar-toggler');
  var menu = toggler && document.getElementById(toggler.getAttribute('aria-controls'));

  if (toggler && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('show', open);
      toggler.setAttribute('aria-expanded', String(open));
    };

    toggler.addEventListener('click', function () {
      setOpen(toggler.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('show')) {
        setOpen(false);
        toggler.focus();
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Definition tooltips: show on hover/focus/tap, stay hoverable, dismiss with Escape (WCAG 1.4.13).
  var terms = Array.prototype.slice.call(document.querySelectorAll('.term'));
  var header = document.querySelector('.site-header');

  var placeTip = function (term) {
    var tip = term.querySelector('.term-tip');
    term.classList.remove('is-below');
    tip.style.setProperty('--tip-shift', '0px');
    window.requestAnimationFrame(function () {
      var r = tip.getBoundingClientRect();
      if (!r.width) return;
      var minTop = (header ? header.getBoundingClientRect().bottom : 0) + 8;
      if (r.top < minTop) {
        term.classList.add('is-below');
        r = tip.getBoundingClientRect();
      }
      var pad = 8;
      var shift = 0;
      if (r.left < pad) shift = pad - r.left;
      else if (r.right > window.innerWidth - pad) shift = window.innerWidth - pad - r.right;
      tip.style.setProperty('--tip-shift', shift + 'px');
    });
  };

  terms.forEach(function (term) {
    var trigger = term.querySelector('.term-trigger');
    trigger.addEventListener('click', function () {
      term.classList.remove('is-dismissed');
      term.classList.toggle('is-open');
      placeTip(term);
    });
    term.addEventListener('mouseenter', function () { placeTip(term); });
    term.addEventListener('focusin', function () { placeTip(term); });
    term.addEventListener('mouseleave', function () { term.classList.remove('is-dismissed'); });
    term.addEventListener('focusout', function () { term.classList.remove('is-dismissed', 'is-open'); });
  });

  if (terms.length) {
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      terms.forEach(function (term) {
        if (term.matches(':hover') || term.contains(document.activeElement) || term.classList.contains('is-open')) {
          term.classList.add('is-dismissed');
          term.classList.remove('is-open');
        }
      });
    });
    document.addEventListener('click', function (e) {
      terms.forEach(function (term) {
        if (!term.contains(e.target)) term.classList.remove('is-open');
      });
    });
  }

  // Theme is applied by an inline script in <head> to avoid a flash; this wires up the toggle.
  var root = document.documentElement;
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    var syncToggle = function () {
      themeToggle.setAttribute('aria-pressed', String(root.getAttribute('data-bs-theme') === 'dark'));
    };
    syncToggle();
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-bs-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
      syncToggle();
    });
  }

  // Contact form: client-side validation only; backend to be wired up later.
  var form = document.getElementById('contact-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));

  // Pre-select audit type from links like /contact/?audit=full
  var auditParam = new URLSearchParams(window.location.search).get('audit');
  var auditSelect = document.getElementById('audit');
  if (auditParam && auditSelect && auditSelect.querySelector('option[value="' + CSS.escape(auditParam) + '"]')) {
    auditSelect.value = auditParam;
  }

  // Link the error message to a field only while it is invalid.
  var setFieldState = function (field, invalid) {
    var errorId = field.id + '-error';
    var ids = (field.getAttribute('aria-describedby') || '').split(' ').filter(function (id) {
      return id && id !== errorId;
    });
    if (invalid && document.getElementById(errorId)) ids.push(errorId);
    if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
    else field.removeAttribute('aria-describedby');
    if (invalid) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  };

  fields.forEach(function (field) {
    field.addEventListener('input', function () {
      if (form.classList.contains('was-validated')) setFieldState(field, !field.checkValidity());
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.classList.add('was-validated');

    fields.forEach(function (field) {
      setFieldState(field, !field.checkValidity());
    });

    var firstInvalid = fields.find(function (field) { return !field.checkValidity(); });
    if (firstInvalid) {
      status.className = 'form-status alert alert-danger mt-4';
      status.textContent = 'Please fix the highlighted fields and try again.';
      firstInvalid.focus();
      return;
    }

    // TODO: replace with a real submission (fetch to your backend / form service).
    status.className = 'form-status alert alert-success mt-4';
    status.textContent = 'Thanks! Your message is ready to send. The form is not connected yet, so please email ankerpeet@gmail.com directly for now.';
    form.reset();
    form.classList.remove('was-validated');
    fields.forEach(function (field) { setFieldState(field, false); });
    status.focus();
  });
})();
