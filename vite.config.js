import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
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
        customApp: resolve(__dirname, 'custom-app.html'),
      },
    },
  },
});
