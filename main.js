// ============================================================
// NOVE POS — main.js
// ============================================================

// ---------- GOOGLE ANALYTICS ----------
(function() {
    const gaId = 'G-HKP9QTLV70';
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId);
    window.gtag = gtag;
})();

// ---------- NAVBAR SCROLL ----------
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ---------- MOBILE MENU ----------
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    const closeBtn  = document.getElementById('close-menu');
    const overlay   = document.getElementById('mobile-menu');

    if (toggleBtn && overlay) {
        const open  = () => { toggleBtn.classList.add('active'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; };
        const close = () => { toggleBtn.classList.remove('active'); overlay.classList.remove('active'); document.body.style.overflow = ''; };

        toggleBtn.addEventListener('click', e => { e.stopPropagation(); overlay.classList.contains('active') ? close() : open(); });
        if (closeBtn) closeBtn.addEventListener('click', e => { e.stopPropagation(); close(); });
        overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
});

// ---------- PAGE TRANSITIONS ----------
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || a.target === '_blank') return;
        a.addEventListener('click', e => {
            e.preventDefault();
            document.body.classList.add('page-out');
            setTimeout(() => { window.location.href = href; }, 340);
        });
    });
});

// ---------- BFCache Blank Page Fix ----------
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.classList.remove('page-out');
    }
});

// ---------- STAT COUNTER ----------
function animateCounter(el, target, suffix, duration) {
    const isFloat = target % 1 !== 0;
    let start = null;
    const step = ts => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);
        el.textContent = val + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const target = parseFloat(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                animateCounter(el, target, suffix, 1800);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => obs.observe(c));
});

// ---------- PARTICLE CANVAS ----------
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const resize = () => {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const randBetween = (a, b) => a + Math.random() * (b - a);

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * (W || 1200),
            y: Math.random() * (H || 800),
            r: randBetween(1, 2.5),
            vx: randBetween(-0.3, 0.3),
            vy: randBetween(-0.25, 0.25),
            alpha: randBetween(0.15, 0.5),
            color: Math.random() > 0.5 ? '0,242,255' : '112,0,255'
        });
    }

    const draw = () => {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.fill();
        });
        // draw connecting lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,242,255,${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    };
    draw();
});

// ---------- GSAP ANIMATIONS ----------
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // ── Hero date label (no animation, just data) ─────────────────────────
    const dl = document.getElementById('dash-date-label');
    if (dl) {
        const d = new Date();
        dl.textContent = d.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    // NOTE: Hero text/dashboard entrance is handled by pure CSS @keyframes heroFadeUp
    // in style.css — no GSAP on hero elements to avoid any opacity/transform conflicts.

    // ── Scroll-triggered card animations (non-hero only) ──────────────────
    // Exclude #dashboard and .dashboard-frame — they are in the hero (already at top
    // of page), so ScrollTrigger would set opacity:0 and the trigger would never fire,
    // permanently hiding the dashboard.
    gsap.utils.toArray('.glass:not(#dashboard):not(.dashboard-frame)').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                once: true
            },
            y: 25, opacity: 0, duration: 0.7, ease: 'power2.out'
        });
    });
});

// ---------- INDUSTRY SELECTOR ----------
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.ind-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const industry = tab.dataset.industry;

            // Swap tabs
            document.querySelectorAll('.ind-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Swap images with cross-fade
            document.querySelectorAll('.ind-img').forEach(img => img.classList.remove('active'));
            const img = document.getElementById('img-' + industry);
            if (img) img.classList.add('active');

            // Swap text panels
            document.querySelectorAll('.ind-panel').forEach(p => p.classList.remove('active'));
            const panel = document.getElementById('panel-' + industry);
            if (panel) panel.classList.add('active');
        });
    });
});

// ---------- FEATURE WALKTHROUGH ----------
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.wt-tab');
    if (!tabs.length) return;
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.panel;
            document.querySelectorAll('.wt-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.preview-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById('panel-' + target);
            if (panel) panel.classList.add('active');
        });
    });
});

// ---------- LIVE DASHBOARD TICKER ----------
document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.querySelector('.ticker-inner');
    if (!ticker) return;
    const sales = [
        'Sale #4821 — Rs.2,450', 'Sale #4822 — Rs.890', 'Sale #4823 — Rs.5,200',
        'Sale #4824 — Rs.1,100', 'Sale #4825 — Rs.3,750', 'Sale #4826 — Rs.670',
        'Sale #4827 — Rs.9,999', 'Sale #4828 — Rs.450'
    ];
    const text = sales.join('  ·  ') + '  ·  ' + sales.join('  ·  ');
    ticker.textContent = text;
});

// ---------- CHART BAR ANIMATION DELAY ----------
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.chart-bar').forEach((bar, i) => {
        bar.style.animationDelay = (i * 0.1) + 's';
    });
});

// ---------- WHATSAPP BUTTON ----------
// Always visible — just ensures the correct number is set on all links
(function initWhatsApp() {
    const PHONE = '923104523517';
    document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
        el.setAttribute('href', 'https://wa.me/' + PHONE);
    });
})();
