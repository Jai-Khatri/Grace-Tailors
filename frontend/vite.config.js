import { defineConfig } from 'vite';
import { resolve } from 'path';

const __dirname = resolve();

export default defineConfig({
  base: '/',
  server: {
    port: 5000,
    open: true,
    cors: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        sourcemap: true,
      },
    },
    target: 'esnext',
  },
  optimizeDeps: {
    include: [
      'express', 
      'cors',
      'dotenv',
      'mongoose'
    ],
  },
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
