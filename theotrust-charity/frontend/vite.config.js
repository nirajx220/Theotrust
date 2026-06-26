import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Changed from 5173 to 5174
    strictPort: false, // Changed to false to automatically find next available port
    open: true
  }
});
