// Scroll progress bar and gentle reveal-on-scroll, shared by every page.
(function () {
  var bar = document.querySelector('.progress');
  if (bar) {
    var update = function () {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    };
    addEventListener('scroll', update, { passive: true });
    update();
  }
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('[data-reveal], main section, .steps li, figure');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) {
    if (el.getBoundingClientRect().top < innerHeight) return; // already on screen: leave visible
    el.classList.add('pop');
    io.observe(el);
  });
})();
