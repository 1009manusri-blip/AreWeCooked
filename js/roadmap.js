// Navbar Scroll Shrink Effect
const navbarWrapper = document.querySelector('.navbar-wrapper');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbarWrapper?.classList.add('scrolled');
  } else {
    navbarWrapper?.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.roadmap-card');

  cards.forEach(card => {
    const header = card.querySelector('.card-header');
    const content = card.querySelector('.card-content');

    header.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      if (isOpen) {
        // Close current module smoothly
        card.classList.remove('is-open');
        content.style.maxHeight = null;
      } else {
        // Open current module smoothly (does not close other modules)
        card.classList.add('is-open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
/* =========================================================
   AREWECOOKED? — ROADMAP PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const roadmapItems = document.querySelectorAll(".roadmap-item");

    roadmapItems.forEach((item) => {

        const header = item.querySelector(".roadmap-card-header");

        if (!header) return;

        header.addEventListener("click", () => {

            // Toggle ONLY the clicked module.
            // Other modules remain open.
            item.classList.toggle("open");

        });

    });

});