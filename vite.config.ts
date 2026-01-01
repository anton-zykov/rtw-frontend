import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
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
