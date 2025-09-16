import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    hmr: {
      port: 443
    },
    cors: true,
    headers: {
      'Content-Security-Policy': "frame-ancestors 'self' *.replit.dev *.replit.com",
      'X-Frame-Options': 'ALLOWALL'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});