document.addEventListener('DOMContentLoaded', () => {
    // 1. Currency Toggle Logic
    const currencySwitch = document.getElementById('currency-switch');
    const amounts = document.querySelectorAll('.amount');
    const currencySymbols = document.querySelectorAll('.currency');

    currencySwitch.addEventListener('change', () => {
        const isLocal = currencySwitch.checked;
        
        amounts.forEach(amount => {
            const usdVal = amount.getAttribute('data-usd');
            const localVal = amount.getAttribute('data-local');
            
            // Animation for price change
            amount.style.opacity = '0';
            amount.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                amount.innerText = isLocal ? localVal : usdVal;
                amount.style.opacity = '1';
                amount.style.transform = 'translateY(0)';
            }, 300);
        });

        currencySymbols.forEach(symbol => {
            symbol.innerText = isLocal ? 'Rs' : '$';
        });
    });

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 3. Scroll Animation Engine (Custom AOS)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Once animated, no need to observe again
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // 4. Navbar Scroll Effect
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '0.75rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.9)';
        } else {
            nav.style.padding = '1.25rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.7)';
        }
    });

    // 5. Smooth Scroll for all anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Mobile Menu (Simple implementation)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // This is a placeholder for a more complex mobile menu if needed
            // For now, let's just log or do a simple alert/toggle
            console.log('Mobile menu toggled');
        });
    }
});
