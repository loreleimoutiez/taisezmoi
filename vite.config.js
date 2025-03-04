import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import gzipPlugin from 'rollup-plugin-gzip';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  server: {
    historyApiFallback: true,
  },
  plugins: [vue(), react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        gzipPlugin(),
      ],
    },
  },
  esbuild: {
    jsx: 'react',
    jsxInject: `import React from 'react'`,
  },
});
