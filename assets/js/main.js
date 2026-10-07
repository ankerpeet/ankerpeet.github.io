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
