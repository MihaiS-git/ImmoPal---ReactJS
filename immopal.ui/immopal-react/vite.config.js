import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add other aliases if needed
    },
  },
  optimizeDeps: {
    include: ['sockjs-client'], // Ensure sockjs-client is optimized
  },
  define: {
    global: 'globalThis', // Polyfill for global
  },
  build: {
    rollupOptions: {
      plugins: [
        inject({
          global: 'globalThis', // Inject global polyfill
        }),
      ],
    },
  },
});
