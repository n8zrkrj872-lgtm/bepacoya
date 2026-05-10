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
