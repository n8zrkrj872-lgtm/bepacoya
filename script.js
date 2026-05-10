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
    .order('fecha', { ascending: false })
    .limit(3);

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

const TIPOS_PENSAMIENTO = {
  reflexion:   'Reflexión',
  inspiracion: 'Inspiración',
  oncologico:  'Yoga Oncológico',
};

async function cargarPensamientos() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  const { data } = await supabase
    .from('pensamientos')
    .select('*')
    .eq('activo', true)
    .order('fecha', { ascending: false })
    .limit(3);

  if (!data || data.length === 0) {
    grid.innerHTML = `<p style="color:var(--tierra-claro);text-align:center;grid-column:1/-1;padding:40px 0">Próximamente nuevos pensamientos. ¡Mantente al tanto!</p>`;
    return;
  }

  grid.innerHTML = '';
  data.forEach((p, i) => {
    const fecha    = new Date(p.fecha + 'T12:00:00');
    const dia      = fecha.getDate();
    const mes      = fecha.toLocaleString('es-MX', { month: 'long' });
    const año      = fecha.getFullYear();
    const fechaStr = `${dia} de ${mes}, ${año}`;
    const tipo     = TIPOS_PENSAMIENTO[p.tipo] || p.tipo;
    const featured = i === 0 ? 'blog-card--featured' : '';
    const preview  = p.contenido.length > 220 ? p.contenido.substring(0, 220) + '...' : p.contenido;

    const article = document.createElement('article');
    article.className = `blog-card ${featured}`;
    article.innerHTML = `
      <div class="blog-card__meta">
        <span class="blog-date">${fechaStr}</span>
        <span class="blog-tag">${tipo}</span>
      </div>
      <h3>${p.titulo}</h3>
      <p>${preview}</p>
      <a href="pensamientos.html#p-${p.id}" class="blog-card__link">Seguir leyendo →</a>`;
    grid.appendChild(article);
  });
}

cargarPensamientos();

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

// Live classes — código validado contra Supabase
const accessForm   = document.getElementById('access-form');
const accessCodeEl = document.getElementById('access-code');
const accessError  = document.getElementById('access-error');
const liveGate     = document.getElementById('live-gate');
const livePlayer   = document.getElementById('live-player');
const liveIframe   = document.getElementById('live-iframe');
const exitLive     = document.getElementById('exit-live');

if (accessForm) {
  accessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = accessCodeEl.value.trim().toUpperCase();
    const submitBtn = accessForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Verificando...';
    submitBtn.disabled = true;

    const { data } = await supabase
      .from('clases_en_vivo')
      .select('stream_url, activo, codigo')
      .eq('id', 1)
      .single();

    submitBtn.textContent = 'Entrar';
    submitBtn.disabled = false;

    if (data && data.activo && data.codigo === code && data.stream_url) {
      accessError.textContent = '';
      liveGate.hidden = true;
      livePlayer.hidden = false;
      liveIframe.src = data.stream_url;
    } else if (!data || !data.activo) {
      accessError.textContent = 'No hay ninguna clase activa en este momento.';
      accessCodeEl.style.borderColor = '#e07070';
      setTimeout(() => { accessCodeEl.style.borderColor = ''; }, 2000);
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
