document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Follower Glow
  const mouseGlow = document.getElementById('mouseGlow');
  if (mouseGlow) {
    window.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = `${e.clientX}px`;
      mouseGlow.style.top = `${e.clientY}px`;
    });
  }

  // 2. Navbar Scroll Shrink Effect
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // 4. Card 3D Tilt Effect
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // 5. Button Ripple Animation
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      const rect = this.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple');

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
    });
  });
});
// ==========================================
// SCROLL REVEAL & TIMELINE PROGRESS OBSERVER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Reveal-on-scroll Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // 2. Dynamic Timeline Line Glow fill on scroll
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineSection = document.querySelector('.timeline-wrapper');

  if (timelineProgress && timelineSection) {
    window.addEventListener('scroll', () => {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalHeight = rect.height;
        const visiblePx = windowHeight - rect.top;
        const progressPercentage = Math.min(Math.max((visiblePx / (totalHeight + windowHeight / 2)) * 100, 0), 100);

        if (window.innerWidth <= 768) {
          timelineProgress.style.height = `${progressPercentage}%`;
          timelineProgress.style.width = '3px';
        } else {
          timelineProgress.style.width = `${progressPercentage}%`;
          timelineProgress.style.height = '3px';
        }
      }
    });
  }
});