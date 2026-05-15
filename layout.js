// layout.js - Injects shared Header and Footer
const footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <a href="index.html" class="logo" style="margin-bottom: 1.5rem;">Nove<span style="opacity: 0.5;">POS</span></a>
                    <p style="color: var(--text-dim);">Transforming retail with cinematic software solutions.</p>
                </div>
                <div class="footer-col">
                    <h4>Product</h4>
                    <ul>
                        <li><a href="features.html">Features</a></li>
                        <li><a href="pricing.html">Pricing</a></li>
                        <li><a href="download.html">Download</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="custom-app.html">Custom Dev</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="documentation.html">Docs</a></li>
                        <li><a href="#">Status</a></li>
                    </ul>
                </div>
            </div>
            <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); text-align: center; color: var(--text-dim); font-size: 0.8rem;">
                &copy; 2026 Nove POS. All rights reserved.
            </div>
        </div>
    </footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    // Inject Footer
    const main = document.querySelector('main');
    if (main) {
        main.insertAdjacentHTML('afterend', footerHTML);
    }
});
