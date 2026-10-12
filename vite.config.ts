import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // 0.0.0.0 — necessário para o live preview do Arena
    port: 5173,
    allowedHosts: true, // permite o host proxyado *.e2b.app do live preview
  },
  preview: {
    host: true,
    port: 4173,
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    // O jogo é 2D e leve; desabilitar minify não é necessário, mas mantemos sourcemap p/ debug.
    sourcemap: false,
  },
});
