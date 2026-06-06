// Supabase — cargar eventos
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient(
  'https://kzqtjzzpyhmzdlczsbnz.supabase.co',
  'sb_publishable_s3eWk4Z4L31DlyLyYbHbYw_jrpMV7-z'
);

// XSS helper — escapa caracteres peligrosos antes de insertar en innerHTML
function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}

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
        <span class="event-month">${esc(mes)}</span>
      </div>
      <div class="event-card__content">
        <span class="event-tag ${esc(tipo.clase)}">${esc(tipo.label)}</span>
        <h3>${esc(ev.titulo)}</h3>
        ${ev.descripcion ? `<p>${esc(ev.descripcion)}</p>` : ''}
        <div class="event-meta">
          ${ev.hora  ? `<span>🕐 ${esc(ev.hora)}</span>`  : ''}
          ${ev.lugar ? `<span>📍 ${esc(ev.lugar)}</span>` : ''}
        </div>
        <button class="btn ${btnClass} btn--sm event-rsvp" data-event="${esc(ev.titulo)}">Confirmar asistencia</button>
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
        <img src="${esc(ev.foto_url)}" alt="${esc(ev.titulo)}" loading="lazy" />
        <span class="event-tag ${esc(tipo.clase)} memoria-card__tag">${esc(tipo.label)}</span>
      </div>
      <div class="memoria-card__info">
        <span class="memoria-card__date">${dia} de ${esc(mes)}, ${año}</span>
        <h3>${esc(ev.titulo)}</h3>
        ${ev.descripcion ? `<p>${esc(ev.descripcion)}</p>` : ''}
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
        <span class="blog-date">${esc(fechaStr)}</span>
        <span class="blog-tag">${esc(tipo)}</span>
      </div>
      <h3>${esc(p.titulo)}</h3>
      <p>${esc(preview)}</p>
      <a href="pensamientos.html#p-${parseInt(p.id, 10)}" class="blog-card__link">Seguir leyendo →</a>`;
    grid.appendChild(article);
  });
}

cargarPensamientos();

// Contact form — Formspree sin redirección
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const res = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      btn.textContent = '✓ Mensaje enviado';
      btn.style.background = '#698d6c';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    } else {
      btn.textContent = 'Error — intenta de nuevo';
      btn.disabled = false;
    }
  });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');

// WhatsApp — no pasa de la línea del footer
const waBtn = document.querySelector('.whatsapp-float');
const footerBottom = document.querySelector('.footer__bottom');
function ajustarWhatsApp() {
  if (!waBtn || !footerBottom) return;
  const rect = footerBottom.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    waBtn.style.bottom = (window.innerHeight - rect.top + 12) + 'px';
  } else {
    waBtn.style.bottom = '24px';
  }
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  ajustarWhatsApp();
}, { passive: true });

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  document.body.classList.toggle('menu-open', isOpen);
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});


// Live classes — código validado contra Supabase
const accessForm   = document.getElementById('access-form');
const accessCodeEl = document.getElementById('access-code');
const accessError  = document.getElementById('access-error');
const liveGate     = document.getElementById('live-gate');
const livePlayer   = document.getElementById('live-player');
const liveLink     = document.getElementById('live-link');
const exitLive     = document.getElementById('exit-live');

if (accessForm) {
  accessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = accessCodeEl.value.trim().toUpperCase();
    const submitBtn = accessForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Verificando...';
    submitBtn.disabled = true;

    // La verificación ocurre en el servidor — el código y el URL nunca se
    // envían al navegador juntos. La función SQL devuelve el stream_url
    // sólo si el código es correcto; de lo contrario devuelve null.
    const { data: result } = await supabase.rpc('verificar_codigo_clase', { p_codigo: code });

    submitBtn.textContent = 'Entrar';
    submitBtn.disabled = false;

    if (result && result.stream_url) {
      accessError.textContent = '';
      document.getElementById('live-titulo').textContent = result.titulo || 'Clase en Vivo';
      liveLink.href = result.stream_url;
      liveGate.hidden = true;
      livePlayer.hidden = false;
    } else if (!result || !result.activo) {
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
