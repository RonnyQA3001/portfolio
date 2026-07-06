document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('wrapper');
  const modeBtn = document.getElementById('mode-btn');

  // --- Tema claro/oscuro persistido ---
  const applyTheme = (theme) => {
    wrapper.setAttribute('data-theme', theme);
    modeBtn.textContent = theme === 'dark' ? '☀ claro' : '☾ oscuro';
  };

  // El tema inicial ya lo resolvió el script inline del HTML; aquí solo se sincroniza la etiqueta
  applyTheme(wrapper.getAttribute('data-theme'));

  modeBtn.addEventListener('click', () => {
    const next = wrapper.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('rr-theme', next);
  });

  // --- Menú móvil ---
  const menuBtn = document.getElementById('menu-btn');
  const navbar = document.querySelector('.navbar');
  menuBtn.addEventListener('click', () => {
    const open = navbar.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Animación de máquina de escribir en el nombre ---
  const full = 'Ronny Rodríguez';
  const typedEl = document.getElementById('typed-text');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedEl.textContent = full;
  } else {
    let i = 0;
    const tick = () => {
      i++;
      typedEl.textContent = full.slice(0, i);
      if (i < full.length) setTimeout(tick, i < 6 ? 100 : 85);
    };
    setTimeout(tick, 400);
  }

  // --- Fade de entrada en proyectos (bidireccional con scroll) ---
  const cards = document.querySelectorAll('#projects .proj-cell:not(.filler-cell)');
  const checkReveal = () => {
    const vh = window.innerHeight;
    let entering = 0;
    cards.forEach((c) => {
      const r = c.getBoundingClientRect();
      const inView = r.top < vh * 0.92 && r.bottom > 0;
      if (inView && !c.classList.contains('reveal')) {
        c.style.animationDelay = ((entering % 2) * 160) + 'ms';
        c.classList.add('reveal');
        entering++;
      } else if (!inView && c.classList.contains('reveal')) {
        c.classList.remove('reveal');
        void c.offsetWidth;
      }
    });
  };
  requestAnimationFrame(checkReveal);
  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('resize', checkReveal, { passive: true });

  // --- Formulario de contacto (demo) ---
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias! Este es un formulario de demostración.');
    form.reset();
  });
});
