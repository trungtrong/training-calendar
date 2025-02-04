import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  envPrefix: 'ENV_',
  resolve: {
    alias: {
      '@/assets': path.join(__dirname, 'src/assets'),
      '@': path.join(__dirname, 'src'),
      '@public': path.join(__dirname, 'public'),
    },
  },
  build: {
    outDir: 'dist',
  },
});