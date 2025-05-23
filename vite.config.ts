import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Load .env variables

  return {
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'splash.html',
            dest: '.', // copies splash.html to dist root
          },
        ],
      }),
    ],
    base: './',
  };
});
