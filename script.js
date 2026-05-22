// THE ACADEMIC STUDIO — script.js

// NAV SCROLL EFFECT
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// MOBILE NAV TOGGLE
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// CLOSE MOBILE NAV ON LINK CLICK
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// SMOOTH SCROLL FOR ALL ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// CONTACT FORM
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Collect form data
  const data = {
    name: document.getElementById('parentName').value,
    email: document.getElementById('email').value,
    country: document.getElementById('country').value,
    grade: document.getElementById('grade').value,
    message: document.getElementById('message').value,
  };

  // Simulate send (replace with Formspree or EmailJS endpoint)
  setTimeout(() => {
    form.innerHTML = `
      <div class="form-success show">
        <h3>Message received.</h3>
        <p>Thank you, ${data.name.split(' ')[0]}. I'll be in touch within 24 hours.<br />
        Please check your inbox at <strong>${data.email}</strong> — and your spam folder, just in case.</p>
      </div>
    `;
  }, 1200);
});

// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
  '.philosophy-card, .course-card, .testimonial-card, .resource-card, .credential'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ACTIVE NAV HIGHLIGHTING
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// ADD ACTIVE LINK STYLE DYNAMICALLY
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--ink) !important; background: var(--cream-dark); }`;
document.head.appendChild(style);
