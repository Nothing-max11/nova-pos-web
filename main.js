document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. GSAP ScrollTrigger Registration
    gsap.registerPlugin(ScrollTrigger);

    // 3. Hero Animations
    const heroTl = gsap.timeline();
    
    heroTl.from(".badge-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out"
    })
    .from(".reveal-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=0.4")
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from(".hero-btns", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    .from(".hero-device-reveal", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power2.out"
    }, "-=0.8");

    // 4. Intro Text Reveal
    gsap.from(".text-reveal", {
        scrollTrigger: {
            trigger: ".intro-text",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
        },
        opacity: 0.1,
        y: 50,
        duration: 1
    });

    // 5. Feature Sections Storytelling (Cinematic Stagger)
    const features = gsap.utils.toArray('.feature-story');
    features.forEach((feature, i) => {
        const visual = feature.querySelector('.story-visual');
        const info = feature.querySelector('.story-info');
        const tags = feature.querySelectorAll('.feature-tags li');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: feature,
                start: "top 70%",
                end: "top 30%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(visual, {
            x: i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from(info.querySelector('h2'), {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.8")
        .from(info.querySelector('p'), {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from(tags, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");
    });

    // 6. Stats Counter
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-val'));
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 90%",
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            onUpdate: function() {
                stat.innerHTML = Math.ceil(this.targets()[0].innerText);
            }
        });
    });

    // 7. Currency Toggle Logic (Pricing Page)
    const currencyToggle = document.getElementById('currency-toggle');
    if (currencyToggle) {
        const amounts = document.querySelectorAll('.amt');
        const symbols = document.querySelectorAll('.cur');

        currencyToggle.addEventListener('change', () => {
            const isLocal = currencyToggle.checked;
            
            amounts.forEach(amt => {
                const usd = amt.getAttribute('data-usd');
                const local = amt.getAttribute('data-local');
                
                gsap.to(amt, {
                    y: -10,
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        amt.innerText = isLocal ? local : usd;
                        gsap.to(amt, { y: 0, opacity: 1, duration: 0.2 });
                    }
                });
            });

            symbols.forEach(sym => {
                sym.innerText = isLocal ? 'Rs' : '$';
            });
        });
    }

    // 8. Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            gsap.to(nav, { backgroundColor: 'rgba(2, 6, 23, 0.9)', padding: '1rem 0', duration: 0.3 });
        } else {
            nav.classList.remove('scrolled');
            gsap.to(nav, { backgroundColor: 'rgba(2, 6, 23, 0.6)', padding: '1.5rem 0', duration: 0.3 });
        }
    });

});
