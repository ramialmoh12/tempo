const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTop');
const form = document.getElementById('newsletterForm');
const formMessage = document.getElementById('formMessage');
const cursorGlow = document.querySelector('.cursor-glow');
const header = document.querySelector('.site-header');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 70));

      const updateCounter = () => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          return;
        }
        counter.textContent = current;
        requestAnimationFrame(updateCounter);
      };

      updateCounter();
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.65 }
);

document.querySelectorAll('.counter').forEach((counter) => {
  counterObserver.observe(counter);
});

window.addEventListener('scroll', () => {
  const showButton = window.scrollY > 520;
  scrollTopBtn.classList.toggle('show', showButton);
  header.style.top = window.scrollY > 80 ? '10px' : '18px';

  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let currentId = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) currentId = section.id;
  });

  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.textContent = 'Thank you! You are now on the Tempo list.';
  form.reset();

  setTimeout(() => {
    formMessage.textContent = '';
  }, 3500);
});

window.addEventListener('mousemove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.opacity = '1';
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener('mouseleave', () => {
  if (cursorGlow) cursorGlow.style.opacity = '0';
});
