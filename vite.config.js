/* eslint-env node */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import gzipPlugin from 'rollup-plugin-gzip';

// Vite configuration
export default defineConfig({
  base: '/',
  server: {
    historyApiFallback: true
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        gzipPlugin(),
      ],
    },
  },
})
