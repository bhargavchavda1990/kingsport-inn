/* King's Port Inn — front-end behaviour (no dependencies) */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* Sticky header */
  var header = $('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile nav */
  var toggle = $('.nav-toggle');
  var nav = $('#site-nav');
  function setNav(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  }
  toggle.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      setNav(false);
      $$('.has-sub.is-open').forEach(function (li) { li.classList.remove('is-open'); li.querySelector('button').setAttribute('aria-expanded', 'false'); });
    }
  });
  $$('.nav a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });

  /* Dropdown (click/tap + keyboard; hover handled by CSS on desktop) */
  $$('.has-sub > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = !li.classList.contains('is-open');
      $$('.has-sub.is-open').forEach(function (o) { if (o !== li) { o.classList.remove('is-open'); o.querySelector('button').setAttribute('aria-expanded', 'false'); } });
      li.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) {
      $$('.has-sub.is-open').forEach(function (li) { li.classList.remove('is-open'); li.querySelector('button').setAttribute('aria-expanded', 'false'); });
    }
  });

  /* Reveal on scroll */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Sliders */
  $$('.slider').forEach(function (slider) {
    var track = $('.slides', slider);
    var imgs = $$('img', track);
    var count = $('.slider-count', slider);
    if (imgs.length < 2) { slider.classList.add('is-single'); return; }
    function index() { return Math.round(track.scrollLeft / track.clientWidth); }
    function update() { if (count) count.textContent = (index() + 1) + ' / ' + imgs.length; }
    function go(dir) {
      var i = index() + dir;
      if (i < 0) i = imgs.length - 1;
      if (i >= imgs.length) i = 0;
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    }
    $('.slider-btn--prev', slider).addEventListener('click', function () { go(-1); });
    $('.slider-btn--next', slider).addEventListener('click', function () { go(1); });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(update); }, { passive: true });
    update();
  });

  /* Lightbox */
  var lb = $('.lightbox');
  if (lb) {
    var links = $$('.gallery a');
    var lbImg = $('img', lb);
    var cur = 0;
    function show(i) {
      cur = (i + links.length) % links.length;
      lbImg.src = links[cur].getAttribute('href');
      lbImg.alt = links[cur].querySelector('img').alt;
    }
    function openLb(i) { show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; $('.lb-close', lb).focus(); }
    function closeLb() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
    links.forEach(function (a, i) { a.addEventListener('click', function (e) { e.preventDefault(); openLb(i); }); });
    $('.lb-close', lb).addEventListener('click', closeLb);
    $('.lb-prev', lb).addEventListener('click', function () { show(cur - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* Contact form.
     Front-end only: set data-endpoint on the <form> to your existing backend URL.
     Fields posted: firstName, lastName, email, phone, message. */
  var form = $('#contact-form');
  if (form) {
    var ok = $('.form-status--ok', form);
    var err = $('.form-status--err', form);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.classList.remove('is-visible');
      err.classList.remove('is-visible');
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var endpoint = form.getAttribute('data-endpoint');
      var data = new FormData(form);
      if (!endpoint) {
        // No backend wired yet: fall back to the visitor's mail app.
        var body = 'Name: ' + data.get('firstName') + ' ' + data.get('lastName') + '\nPhone: ' + (data.get('phone') || '-') + '\n\n' + data.get('message');
        window.location.href = 'mailto:' + form.getAttribute('data-mailto') + '?subject=' + encodeURIComponent('Website inquiry') + '&body=' + encodeURIComponent(body);
        return;
      }
      var btn = $('button[type="submit"]', form);
      btn.disabled = true;
      fetch(endpoint, { method: 'POST', body: data })
        .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); form.reset(); ok.classList.add('is-visible'); })
        .catch(function () { err.classList.add('is-visible'); })
        .then(function () { btn.disabled = false; });
    });
  }

  /* Footer year */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
