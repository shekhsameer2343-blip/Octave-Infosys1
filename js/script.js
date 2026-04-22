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

/* ========================================
       OFFER MODAL
       ======================================== */
    const offerModal = document.getElementById('offerModal');
    const modalClose = document.getElementById('modalClose');
    const modalSkip  = document.getElementById('modalSkip');
    const modalCta   = document.getElementById('modalCta');
 
    function openModal() {
        offerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        offerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
 
    // Open after 1 second on page load
    setTimeout(openModal, 1000);
 
    modalClose.addEventListener('click', closeModal);
    modalSkip.addEventListener('click', closeModal);
    modalCta.addEventListener('click', () => {
        closeModal();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
    // Close on backdrop click
    offerModal.addEventListener('click', e => {
        if (e.target === offerModal) closeModal();
    });
    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });
 
    /* Countdown timer — counts down from 23:59:00 */
    (function() {
        let total = 23 * 3600 + 59 * 60;
        const hEl = document.getElementById('cd-hours');
        const mEl = document.getElementById('cd-mins');
        const sEl = document.getElementById('cd-secs');
        function tick() {
            if (total <= 0) return;
            const h = Math.floor(total / 3600);
            const m = Math.floor((total % 3600) / 60);
            const s = total % 60;
            hEl.textContent = String(h).padStart(2,'0');
            mEl.textContent = String(m).padStart(2,'0');
            sEl.textContent = String(s).padStart(2,'0');
            total--;
        }
        tick();
        setInterval(tick, 1000);
    })();

/* ========================================
       SCROLL TO TOP FAB
       ======================================== */
    const fabTop = document.getElementById('fabTop');
    window.addEventListener('scroll', () => {
        fabTop.classList.toggle('visible', window.scrollY > 400);
    });
    fabTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

/* ========================================
   CHATBOT — Groq API (no IIFE, direct)
   ======================================== */

var CB_API = 'https://api.groq.com/openai/v1/chat/completions';
var CB_KEY = 'MY_API_KEY';
var CB_MODEL = 'llama-3.3-70b-versatile';

var CB_SYSTEM = 'You are a friendly AI assistant for Octave Infosys, a premier IT consultancy in Mumbai, India. Answer ONLY from this knowledge base:\n\nCOMPANY: Octave Infosys\nADDRESS: Shop No. 8, Zaver Road, Mulund West, Mumbai — 400080\nPHONE: +91 22 2560 0000\nEMAIL: info@octaveinfosys.com\nWEBSITE: https://octaveinfosys.com\nHOURS: Mon–Sat 10:00 AM – 7:00 PM\nCERTS: ISO Certified, MSME Registered\nEXPERIENCE: 8+ years, 200+ projects, 98% satisfaction\n\nSERVICES:\n1. Software Development — Custom web apps, mobile apps, enterprise software, APIs, SaaS using React, Node.js, Python, .NET, Java, Flutter. Agile methodology.\n2. Digital Marketing — SEO, SEM, Social Media Marketing, Google Ads, Content Marketing, Email Marketing, Online Reputation Management. Monthly analytics reports.\n3. IT Consultancy — Technology roadmaps, infrastructure audits, cloud migration, cybersecurity assessments, network architecture, digital transformation consulting.\n4. Web Development — Responsive websites, e-commerce (Shopify, WooCommerce), CMS (WordPress), PWAs, landing pages.\n5. Mobile App Development — Native iOS/Android, cross-platform (React Native, Flutter), UI/UX design, app store optimization.\n6. Cloud Solutions — AWS, Azure, Google Cloud, cloud migration, DevOps, Docker, Kubernetes, cost optimization.\n\nINDUSTRIES: Healthcare, FinTech, E-commerce, Logistics, Real Estate, EdTech, Manufacturing, Hospitality.\n\nWHY US: Dedicated PMs, transparent pricing, post-delivery support, NDA protection, 98% on-time delivery, 50+ developers, ISO quality.\n\nPRICING: Custom quotes, flexible models (Fixed Price, Time & Material, Dedicated Team), free consultation, EMI options for large projects.\n\nMISSION: Deliver innovative, reliable technology solutions for digital transformation.\nVISION: Be a global leader in high-quality IT infrastructure solutions.\n\nRULES: Be warm and concise (2-3 paragraphs). Use bullets for lists. For pricing, suggest contacting for custom quote. If asked something outside this info, say you don\'t have that info and suggest contacting info@octaveinfosys.com or +91 22 2560 0000. Never make up facts.';

var cbHistory = [{ role: 'system', content: CB_SYSTEM }];
var cbBusy = false;

// Elements
var cbWrap = document.getElementById('chatBotWrap');
var cbToggle = document.getElementById('chatToggle');
var cbCloseIcon = document.getElementById('chatCloseIcon');
var cbMsgs = document.getElementById('chatMsgs');
var cbIn = document.getElementById('chatIn');
var cbSendBtn = document.getElementById('chatSendBtn');
var cbQuick = document.getElementById('chatQuickReplies');

// ---- Toggle ----
cbToggle.addEventListener('click', function () {
    var isOpen = cbWrap.classList.toggle('open');
    cbCloseIcon.style.display = isOpen ? 'block' : 'none';
    cbToggle.children[0].style.display = isOpen ? 'none' : 'block';
    if (isOpen) cbIn.focus();
});

// ---- Scroll ----
function cbScroll() { cbMsgs.scrollTop = cbMsgs.scrollHeight; }

// ---- Escape ----
function cbEsc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

// ---- Add message ----
function cbAdd(text, who) {
    var av = who === 'bot' ? 'O' : 'U';
    var div = document.createElement('div');
    div.className = 'cb-msg cb-msg--' + who;
    div.innerHTML = '<div class="cb-av">' + av + '</div><div class="cb-bubble">' + cbEsc(text) + '</div>';
    cbMsgs.appendChild(div);
    cbScroll();
    return div;
}

// ---- Typing ----
function cbShowTyping() {
    var d = document.createElement('div');
    d.className = 'cb-msg cb-msg--bot';
    d.id = 'cbTyping';
    d.innerHTML = '<div class="cb-av">O</div><div class="cb-bubble"><div class="cb-typing"><span></span><span></span><span></span></div></div>';
    cbMsgs.appendChild(d);
    cbScroll();
}
function cbHideTyping() { var e = document.getElementById('cbTyping'); if (e) e.remove(); }

// ---- Lock/Unlock ----
function cbLock(v) {
    cbBusy = v;
    cbSendBtn.disabled = v;
    cbIn.disabled = v;
    var btns = document.querySelectorAll('.qr-btn');
    for (var i = 0; i < btns.length; i++) btns[i].disabled = v;
}

// ---- Send to Groq ----
function cbSend(text) {
    if (!text || !text.trim() || cbBusy) return;
    text = text.trim();

    // Hide quick replies
    if (cbQuick) cbQuick.style.display = 'none';

    // User bubble
    cbAdd(text, 'user');
    cbHistory.push({ role: 'user', content: text });

    // Typing
    cbLock(true);
    cbShowTyping();

    fetch(CB_API, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + CB_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: CB_MODEL, messages: cbHistory, temperature: 0.7, max_tokens: 700 })
    })
    .then(function (r) {
        if (!r.ok) throw new Error('API ' + r.status);
        return r.json();
    })
    .then(function (data) {
        var reply = data.choices[0].message.content.trim();
        cbHideTyping();
        cbAdd(reply, 'bot');
        cbHistory.push({ role: 'assistant', content: reply });
        // Trim history
        if (cbHistory.length > 21) cbHistory = [cbHistory[0]].concat(cbHistory.slice(-20));
    })
    .catch(function (err) {
        cbHideTyping();
        var el = cbAdd('Sorry, something went wrong. Please try again or contact us at info@octaveinfosys.com', 'bot');
        el.querySelector('.cb-bubble').classList.add('cb-bubble--err');
        console.error('Chatbot error:', err);
    })
    .then(function () { cbLock(false); });
}

// ---- Input send ----
cbSendBtn.addEventListener('click', function () {
    var t = cbIn.value; cbIn.value = ''; cbSend(t);
});
cbIn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); var t = cbIn.value; cbIn.value = ''; cbSend(t); }
});

// ---- Quick replies ----
var qrBtns = document.querySelectorAll('.qr-btn');
for (var i = 0; i < qrBtns.length; i++) {
    qrBtns[i].addEventListener('click', function () { cbSend(this.getAttribute('data-q')); });
}

// ---- Welcome ----
setTimeout(function () {
    cbAdd("Hi! \uD83D\uDC4B I'm the Octave Infosys assistant. Ask me about our services, pricing, or how to reach us.", 'bot');
}, 500);