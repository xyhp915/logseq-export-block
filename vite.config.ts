import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        entryFileNames: 'index.js',
        format: 'es',
        dir: 'dist'
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  },
  optimizeDeps: {
    exclude: ['@logseq/libs']
  }
});