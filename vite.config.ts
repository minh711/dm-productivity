import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Load .env variables

  return {
    server: {
      port: Number(env.VITE_PORT) || 5173,
    },
    build: {
      outDir: path.resolve(__dirname, 'build'),
      base: './', // Ensure relative paths for assets
    },
    plugins: [react()],
  };
});
