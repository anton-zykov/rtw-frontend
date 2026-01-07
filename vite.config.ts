import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
    ],
    server: {
      https: env.VITE_HTTPS === 'true'
        ? {
            key: fs.readFileSync(env.VITE_SSL_KEY_PATH),
            cert: fs.readFileSync(env.VITE_SSL_CERT_PATH),
          }
        : undefined,
      host: '127.0.0.1',
    },
    resolve: {
      alias: {
        '@': path.resolve('.', 'src'),
      },
    },
  };
});
