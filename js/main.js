/* --- NOVE MOTION SYSTEM --- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Smooth Scroll
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Mobile Menu Toggle (Overlay System)
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.menu-overlay');
    
    const closeMenu = () => {
        navLinks.classList.remove('mobile-active');
        overlay.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        document.body.style.overflow = 'auto';
        lucide.createIcons();
    };

    if (menuBtn && navLinks && overlay) {
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = navLinks.classList.contains('mobile-active');
            
            if (isOpen) {
                closeMenu();
            } else {
                navLinks.classList.add('mobile-active');
                overlay.classList.add('active');
                const icon = menuBtn.querySelector('i');
                icon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden';
                lucide.createIcons();
            }
        });

        overlay.addEventListener('click', closeMenu);
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 4. Mobile Footer Accordion
    const footerHeaders = document.querySelectorAll('.f-col h4');
    footerHeaders.forEach(header => {
        header.addEventListener('click', () => {
            if (window.innerWidth <= 767) {
                const parent = header.parentElement;
                const isActive = parent.classList.contains('active');
                document.querySelectorAll('.f-col').forEach(col => col.classList.remove('active'));
                if (!isActive) parent.classList.add('active');
            }
        });
    });

    // 5. Immersive Features Animation
    const immersiveSections = document.querySelectorAll('.immersive-section');
    immersiveSections.forEach(section => {
        const label = section.querySelector('.immersive-label');
        const title = section.querySelector('.immersive-title');
        const desc = section.querySelector('.immersive-desc');
        const bg = section.querySelector('.immersive-bg');

        if (label && title && desc) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    scrub: 1
                }
            });

            tl.to(label, { opacity: 1, y: 0, duration: 1 })
              .to(title, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
              .to(desc, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
              .to(bg, { scale: 1.2, opacity: 0.1, duration: 2 }, '-=1');
        }
    });

    // 6. Hero Animations
    gsap.from('.hero-v2-title', { y: 100, opacity: 0, duration: 1.5, ease: 'expo.out', delay: 0.2 });
    gsap.from('.hero-v2-subtitle', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 });
    gsap.from('.hero-v2-actions', { y: 30, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.8 });
    gsap.from('.dashboard-showcase', { scale: 0.9, opacity: 0, duration: 2, ease: 'expo.out', delay: 1 });

    // 7. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 50) {
            nav.style.padding = '0.8rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.98)';
        } else {
            nav.style.padding = '1.5rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.7)';
        }
    });
});
