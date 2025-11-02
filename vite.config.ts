import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  server: {
    // Ensure HMR is enabled
    hmr: true,
    watch: {
      // Improve file watching performance
      usePolling: false,
      // Ignore .js files in src (only use .ts/.tsx)
      ignored: ['**/src/**/*.js', '**/node_modules/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    // Prefer TypeScript extensions over JavaScript
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  // Exclude .js files from src directory from build
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
});
