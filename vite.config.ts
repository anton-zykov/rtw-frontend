import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  server: {
    https: {
      key: fs.readFileSync('./localhost+3-key.pem'),
      cert: fs.readFileSync('./localhost+3.pem'),
    },
    host: '127.0.0.1',
    // port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve('.', 'src'),
      '@/assets': path.resolve('.', 'src/assets'),
      '@/features': path.resolve('.', 'src/features'),
      '@/routes': path.resolve('.', 'src/routes'),
      '@/shared': path.resolve('.', 'src/shared'),
    },
  },
});
