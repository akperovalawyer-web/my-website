(() => {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const form = document.getElementById('leadForm');
  const success = document.getElementById('formSuccess');

  // Header shadow on scroll
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  burger.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('is-open');
      nav.classList.remove('is-open');
    });
  });

  // Phone mask (light)
  const phone = form.querySelector('input[name="phone"]');
  phone.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.startsWith('8')) v = '7' + v.slice(1);
    if (!v.startsWith('7') && v.length) v = '7' + v;
    let out = '+7';
    if (v.length > 1) out += ' (' + v.slice(1, 4);
    if (v.length >= 4) out += ') ' + v.slice(4, 7);
    if (v.length >= 7) out += '-' + v.slice(7, 9);
    if (v.length >= 9) out += '-' + v.slice(9, 11);
    e.target.value = out;
  });

  // Form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phoneVal = form.phone.value.trim();
    if (!name || phoneVal.replace(/\D/g, '').length < 11) {
      [form.name, form.phone].forEach(f => {
        if (!f.value.trim() || (f.type === 'tel' && f.value.replace(/\D/g, '').length < 11)) {
          f.style.borderBottomColor = '#d96b5a';
          setTimeout(() => (f.style.borderBottomColor = ''), 2200);
        }
      });
      return;
    }
    success.classList.add('is-visible');
    form.reset();
    setTimeout(() => success.classList.remove('is-visible'), 5000);
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(
    '.hero__title, .hero__sub, .hero__cta, .hero__meta, ' +
    '.about__text, .about__image, .form-section__head, .form, ' +
    '.principles__grid li, .project, .collection, ' +
    '.designers__text, .designers__image, .footer__inner'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
})();
