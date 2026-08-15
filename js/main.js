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
// ==========================================
// AUTHENTICATION INTERACTIONS & VALIDATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

  // 1. Password Visibility Toggle Functionality
  const setupPasswordToggle = (btnId, inputId) => {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (btn && input) {
      btn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        btn.textContent = isPassword ? '🙈' : '👁️';
      });
    }
  };

  setupPasswordToggle('toggleLoginPassword', 'loginPassword');
  setupPasswordToggle('toggleSignupPassword', 'signupPassword');
  setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');

  // Helper: Show or Clear Input Error
  const setError = (input, group, isError) => {
    if (isError) {
      group.classList.add('invalid');
    } else {
      group.classList.remove('invalid');
    }
  };

  // Helper: Basic Email Pattern Check
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 2. Login Form Validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');
      
      let hasError = false;

      // Email Validation
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        setError(emailInput, emailInput.closest('.form-group'), true);
        hasError = true;
      } else {
        setError(emailInput, emailInput.closest('.form-group'), false);
      }

      // Password Validation
      if (!passwordInput.value.trim()) {
        setError(passwordInput, passwordInput.closest('.form-group'), true);
        hasError = true;
      } else {
        setError(passwordInput, passwordInput.closest('.form-group'), false);
      }

      if (!hasError) {
        // Ready for future Backend/OAuth Integration
        alert('Validation successful! Login frontend logic passed.');
      }
    });
  }

  // 3. Password Strength Indicator for Signup
  const signupPassword = document.getElementById('signupPassword');
  const strengthFill = document.getElementById('strengthFill');
  const strengthText = document.getElementById('strengthText');

  if (signupPassword && strengthFill && strengthText) {
    signupPassword.addEventListener('input', () => {
      const val = signupPassword.value;
      let score = 0;

      if (val.length >= 6) score++;
      if (val.length >= 10) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (val.length === 0) {
        strengthFill.style.width = '0%';
        strengthText.textContent = '';
      } else if (score <= 2) {
        strengthFill.style.width = '33%';
        strengthFill.style.backgroundColor = '#ef4444';
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#ef4444';
      } else if (score <= 4) {
        strengthFill.style.width = '66%';
        strengthFill.style.backgroundColor = '#f97316';
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#f97316';
      } else {
        strengthFill.style.width = '100%';
        strengthFill.style.backgroundColor = '#22c55e';
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#22c55e';
      }
    });
  }

  // 4. Signup Form Validation
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('signupName');
      const emailInput = document.getElementById('signupEmail');
      const passInput = document.getElementById('signupPassword');
      const confirmInput = document.getElementById('confirmPassword');

      let hasError = false;

      // Name Validation
      if (!nameInput.value.trim()) {
        setError(nameInput, nameInput.closest('.form-group'), true);
        hasError = true;
      } else {
        setError(nameInput, nameInput.closest('.form-group'), false);
      }

      // Email Validation
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        setError(emailInput, emailInput.closest('.form-group'), true);
        hasError = true;
      } else {
        setError(emailInput, emailInput.closest('.form-group'), false);
      }

      // Password Length Validation
      if (!passInput.value || passInput.value.length < 6) {
        setError(passInput, passInput.closest('.form-group'), true);
        hasError = true;
      } else {
        setError(passInput, passInput.closest('.form-group'), false);
      }

      // Confirm Password Match
      if (!confirmInput.value || confirmInput.value !== passInput.value) {
        setError(confirmInput, confirmInput.closest('.form-group'), true);
        hasError = true;
      } else {
        setError(confirmInput, confirmInput.closest('.form-group'), false);
      }

      if (!hasError) {
        // Ready for future Backend/OAuth Integration
        alert('Validation successful! Account creation frontend logic passed.');
      }
    });
  }

});