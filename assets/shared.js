// theme toggle + reveal-on-scroll, shared across pages
(function () {
  var saved = null;
  try { saved = localStorage.getItem('mj-theme'); } catch (e) {}
  if (saved === 'dark' || saved === 'light') document.documentElement.setAttribute('data-theme', saved);

  window.mjToggleTheme = function () {
    var r = document.documentElement;
    var cur = r.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', next);
    try { localStorage.setItem('mj-theme', next); } catch (e) {}
  };

  document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });

    // scrollspy for top nav
    var links = document.querySelectorAll('.topnav a[href^="#"]');
    if (links.length) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) { a.classList.remove('active'); });
            var a = map[en.target.id];
            if (a) a.classList.add('active');
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) spy.observe(el);
      });
    }
  });
})();
