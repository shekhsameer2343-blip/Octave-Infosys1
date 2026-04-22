// ------------------------------------------------
// 1. Initialize Lucide Icons
// ------------------------------------------------
lucide.createIcons();


// ------------------------------------------------
// 2. Header Scroll Effect
//    Adds a background blur when user scrolls
// ------------------------------------------------
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }
});


// ------------------------------------------------
// 3. Mobile Menu Toggle
// ------------------------------------------------
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('mobile-menu--open', isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
});

function closeMobileMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
}


// ------------------------------------------------
// 4. Scroll Reveal Animation
//    Uses IntersectionObserver for performance
// ------------------------------------------------
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            // Stop observing once revealed (one-time animation)
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ------------------------------------------------
// 5. Smooth Scroll for Anchor Links
// ------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});