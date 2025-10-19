import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
    // proxy: {
      // '/api': {
        // target: 'http://localhost:5000',
        // changeOrigin: true, // optional, depending on your backend setup
        // rewrite: (path) => path.replace(/^\/api/, ''), // optional, removes `/api` prefix
      // },
    // },
  // },
  plugins: [react()],
});
