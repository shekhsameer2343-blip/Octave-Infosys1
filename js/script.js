/* ========================================
       CUSTOM CURSOR
       ======================================== */
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
 
    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    });
 
    function animateRing() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();
 
    document.querySelectorAll('a, button, .service-card, .gallery-card, .testimonial-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.8)';
            cursorRing.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {});
    });
 
    /* ========================================
       HEADER SCROLL
       ======================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    });
 
    /* ========================================
       MOBILE MENU
       ======================================== */
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        const spans = menuToggle.querySelectorAll('span');
        const isOpen = nav.classList.contains('open');
        spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px,5px)' : '';
        spans[1].style.opacity = isOpen ? '0' : '1';
        spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
 
    // Close menu on link click
    nav.querySelectorAll('.nav__link, .btn--header').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
        });
    });
 
    /* ========================================
       SCROLL REVEAL
       ======================================== */
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('active');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
 
    /* ========================================
       SMOOTH ANCHOR LINKS
       ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
 
    /* ========================================
       LOGO IMAGE FALLBACK CLEANUP
       ======================================== */
    window.addEventListener('load', () => {
        const logoImg = document.querySelector('.logo__img');
        const logoTextMain = document.getElementById('logoTextMain');
        if (logoImg && logoImg.naturalWidth === 0) {
            logoImg.style.display = 'none';
        } else if (logoImg && logoTextMain) {
            logoTextMain.style.display = 'none';
        }
    });