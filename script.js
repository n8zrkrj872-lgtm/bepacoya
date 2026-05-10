// Supabase — cargar eventos
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://kzqtjzzpyhmzdlczsbnz.supabase.co',
  'sb_publishable_s3eWk4Z4L31DlyLyYbHbYw_jrpMV7-z'
);

const TIPOS = {
  meditacion: { label: 'Meditación',     clase: 'event-tag--meditacion' },
  especial:   { label: 'Taller especial', clase: 'event-tag--especial' },
  taller:     { label: 'Taller',          clase: 'event-tag--taller' },
  retiro:     { label: 'Retiro',          clase: 'event-tag--retiro' },
};

async function cargarEventos() {
  const grid = document.getElementById('events-grid');
  if (!grid) return;

  const hoy = new Date().toISOString().split('T')[0];

  const { data } = await supabase
    .from('eventos')
    .select('*')
    .eq('activo', true)
    .gte('fecha', hoy)
    .order('fecha', { ascending: true });

  if (!data || data.length === 0) {
    grid.innerHTML = `<p style="color:var(--tierra-claro);text-align:center;grid-column:1/-1;padding:40px 0">Próximamente nuevos eventos. ¡Mantente al tanto!</p>`;
    return;
  }

  grid.innerHTML = '';

  data.forEach((ev, i) => {
    const fecha = new Date(ev.fecha + 'T12:00:00');
    const dia   = fecha.getDate();
    const mes   = fecha.toLocaleString('es-MX', { month: 'short' });
    const tipo  = TIPOS[ev.tipo] || { label: ev.tipo, clase: 'event-tag--taller' };
    const featured = i === 0 ? 'event-card--featured' : '';
    const btnClass = i === 0 ? 'btn--primary' : 'btn--outline';

    const card = document.createElement('div');
    card.className = `event-card ${featured}`;
    card.innerHTML = `
      <div class="event-card__date">
        <span class="event-day">${dia}</span>
        <span class="event-month">${mes}</span>
      </div>
      <div class="event-card__content">
        <span class="event-tag ${tipo.clase}">${tipo.label}</span>
        <h3>${ev.titulo}</h3>
        ${ev.descripcion ? `<p>${ev.descripcion}</p>` : ''}
        <div class="event-meta">
          ${ev.hora   ? `<span>🕐 ${ev.hora}</span>` : ''}
          ${ev.lugar  ? `<span>📍 ${ev.lugar}</span>` : ''}
        </div>
        <button class="btn ${btnClass} btn--sm event-rsvp" data-event="${ev.titulo}">Confirmar asistencia</button>
      </div>`;
    grid.appendChild(card);
  });

  // RSVP buttons
  grid.querySelectorAll('.event-rsvp').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = '✓ ¡Confirmado!';
      btn.classList.add('confirmed');
    });
  });
}

cargarEventos();

async function cargarMemorias() {
  const grid = document.getElementById('memorias-grid');
  if (!grid) return;

  const hoy = new Date().toISOString().split('T')[0];

  const { data } = await supabase
    .from('eventos')
    .select('*')
    .lt('fecha', hoy)
    .not('foto_url', 'is', null)
    .order('fecha', { ascending: false });

  if (!data || data.length === 0) {
    grid.innerHTML = `<p style="color:var(--tierra-claro);text-align:center;grid-column:1/-1;padding:40px 0">Pronto compartiremos memorias de nuestros eventos. ¡Vuelve pronto!</p>`;
    return;
  }

  grid.innerHTML = '';
  data.forEach(ev => {
    const fecha = new Date(ev.fecha + 'T12:00:00');
    const dia   = fecha.getDate();
    const mes   = fecha.toLocaleString('es-MX', { month: 'long' });
    const año   = fecha.getFullYear();
    const tipo  = TIPOS[ev.tipo] || { label: ev.tipo, clase: 'event-tag--taller' };

    const card = document.createElement('div');
    card.className = 'memoria-card';
    card.innerHTML = `
      <div class="memoria-card__img">
        <img src="${ev.foto_url}" alt="${ev.titulo}" loading="lazy" />
        <span class="event-tag ${tipo.clase} memoria-card__tag">${tipo.label}</span>
      </div>
      <div class="memoria-card__info">
        <span class="memoria-card__date">${dia} de ${mes}, ${año}</span>
        <h3>${ev.titulo}</h3>
        ${ev.descripcion ? `<p>${ev.descripcion}</p>` : ''}
      </div>`;
    grid.appendChild(card);
  });
}

cargarMemorias();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

// Contact form submission (placeholder)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = '✓ Mensaje enviado';
  btn.disabled = true;
  btn.style.background = '#698d6c';
  setTimeout(() => {
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

// Live classes access code
// Codes map to YouTube Live embed IDs — add real IDs here
const VALID_CODES = {
  'PACOYA2026': 'jfKfPfyJRdk', // demo YouTube video
  'YOGA2026':   'jfKfPfyJRdk',
  'DEMO':       'jfKfPfyJRdk',
};

const accessForm   = document.getElementById('access-form');
const accessCodeEl = document.getElementById('access-code');
const accessError  = document.getElementById('access-error');
const liveGate     = document.getElementById('live-gate');
const livePlayer   = document.getElementById('live-player');
const liveIframe   = document.getElementById('live-iframe');
const exitLive     = document.getElementById('exit-live');

if (accessForm) {
  accessForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = accessCodeEl.value.trim().toUpperCase();
    const videoId = VALID_CODES[code];

    if (videoId) {
      accessError.textContent = '';
      liveGate.hidden = true;
      livePlayer.hidden = false;
      liveIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else {
      accessError.textContent = 'Código incorrecto. Verifica e intenta de nuevo.';
      accessCodeEl.style.borderColor = '#e07070';
      setTimeout(() => { accessCodeEl.style.borderColor = ''; }, 2000);
    }
  });
}

if (exitLive) {
  exitLive.addEventListener('click', () => {
    liveIframe.src = '';
    livePlayer.hidden = true;
    liveGate.hidden = false;
    accessCodeEl.value = '';
  });
}

// Event RSVP buttons
document.querySelectorAll('.event-rsvp').forEach(btn => {
  btn.addEventListener('click', () => {
    const event = btn.dataset.event;
    btn.textContent = '✓ ¡Confirmado!';
    btn.classList.add('confirmed');
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  '.service-card, .testimonial-card, .value, .about__content, .about__visual'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
