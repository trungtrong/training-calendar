import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dynamicImport()
  ],
  envPrefix: 'ENV_',
  resolve: {
    alias: {
      '@public': path.join(__dirname, 'public'),
      '@': path.join(__dirname, 'src'),
      '@/assets': path.join(__dirname, 'src/assets'),
      '@/helpers': path.join(__dirname, 'src/helpers'), 
      '@/modules': path.join(__dirname, 'src/modules'), 
      '@/shared': path.join(__dirname, 'src/shared'), 
      '@/theme': path.join(__dirname, 'src/theme'),
    },
  },
  build: {
    outDir: 'dist',
  },
});