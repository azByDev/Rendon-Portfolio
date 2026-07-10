// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// =========================================
// MOBILE HAMBURGER MENU
// =========================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// =========================================
// TIMELINE SCROLL ANIMATIONS
// =========================================
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.15 });

timelineItems.forEach(item => timelineObserver.observe(item));

// =========================================
// SKILL BARS ANIMATION
// =========================================
const skillSection = document.getElementById('skills');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !skillsAnimated) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      const pct = fill.dataset.pct || '0';
      setTimeout(() => { fill.style.width = pct + '%'; }, 200);
    });
  }
}, { threshold: 0.3 });

skillObserver.observe(skillSection);

// =========================================
// FAQ ACCORDION
// =========================================
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      el.querySelector('.faq-a').style.maxHeight = null;
    });

    // Open clicked (if it was closed)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// =========================================
// CONTACT FORM SUBMISSION (DEMO)
// =========================================
const contactForm = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const submitBtn    = document.getElementById('submitBtn');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  // Simple client-side validation
  const name    = contactForm.name.value.trim();
  const email   = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    shakeForm();
    return;
  }

  // Simulate sending
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending…';
  submitBtn.querySelector('.btn-icon').textContent = '⏳';

  setTimeout(() => {
    submitBtn.style.display   = 'none';
    formSuccess.style.display = 'block';
    contactForm.reset();
  }, 1600);
});

function shakeForm() {
  contactForm.style.animation = 'none';
  requestAnimationFrame(() => {
    contactForm.style.animation = 'shake 0.4s ease';
  });
}

// Add shake keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%      { transform: translateX(-8px); }
    40%      { transform: translateX(8px); }
    60%      { transform: translateX(-6px); }
    80%      { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);

// =========================================
// ACTIVE NAV LINK HIGHLIGHT
// =========================================
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Add active nav link style dynamically
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-links a.active { color: var(--gold) !important; }`;
document.head.appendChild(navStyle);
