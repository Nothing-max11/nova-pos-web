import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'html-clean-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url !== '/' && !req.url.includes('.') && !req.url.startsWith('/@')) {
            req.url += '.html';
          }
          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        features: resolve(__dirname, 'features.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        download: resolve(__dirname, 'download.html'),
        faq: resolve(__dirname, 'faq.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        documentation: resolve(__dirname, 'documentation.html'),
        '404': resolve(__dirname, '404.html'),
        'custom-app': resolve(__dirname, 'custom-app.html'),
      },
    },
  },
});
