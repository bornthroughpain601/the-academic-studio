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
 
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
 
// SMOOTH SCROLL
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
 
// CONTACT FORM — Web3Forms
const form = document.getElementById('contactForm');
 
form.addEventListener('submit', async function(e) {
  e.preventDefault();
 
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;
 
  const name    = document.getElementById('parentName').value.trim();
  const email   = document.getElementById('email').value.trim();
  const country = document.getElementById('country').value;
  const grade   = document.getElementById('grade').value;
  const message = document.getElementById('message').value.trim();
 
  const payload = {
    access_key: '6f747601-c43f-43e1-84bb-1cb193abdc07',
    subject: `New enquiry from ${name} — The Academic Studio`,
    from_name: 'The Academic Studio Website',
    name,
    email,
    country,
    grade,
    message: message || '(No message provided)',
    botcheck: '',
  };
 
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
 
    const result = await res.json();
 
    if (result.success) {
      form.innerHTML = `
        <div class="form-success show">
          <h3>Message received.</h3>
          <p>Thank you, ${name.split(' ')[0]}. I will be in touch within 24 hours.<br />
          Please check your inbox at <strong>${email}</strong> — and your spam folder, just in case.</p>
        </div>
      `;
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (err) {
    btn.textContent = originalText;
    btn.disabled = false;
    const existing = form.querySelector('.form-error');
    if (existing) existing.remove();
    const errorDiv = document.createElement('p');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = 'color:#8B4F3A;font-size:0.875rem;text-align:center;margin-top:0.5rem;';
    errorDiv.textContent = 'Something went wrong. Please try again or email me directly.';
    form.appendChild(errorDiv);
  }
});
 
// SCROLL REVEAL
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
 
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--ink) !important; background: var(--cream-dark); }`;
document.head.appendChild(style);
