document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('wrapper');
  const modeBtn = document.getElementById('mode-btn');

  // --- Tema claro/oscuro persistido ---
  const applyTheme = (theme) => {
    wrapper.setAttribute('data-theme', theme);
    modeBtn.textContent = theme === 'dark' ? '☀ claro' : '☾ oscuro';
  };

  const saved = localStorage.getItem('rr-theme');
  if (saved === 'dark' || saved === 'light') applyTheme(saved);

  modeBtn.addEventListener('click', () => {
    const next = wrapper.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('rr-theme', next);
  });

  // --- Animación de máquina de escribir en el nombre ---
  const full = 'Ronny Rodríguez';
  const typedEl = document.getElementById('typed-text');
  let i = 0;
  const tick = () => {
    i++;
    typedEl.textContent = full.slice(0, i);
    if (i < full.length) setTimeout(tick, i < 6 ? 100 : 85);
  };
  setTimeout(tick, 400);

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
