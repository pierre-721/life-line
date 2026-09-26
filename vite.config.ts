import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rolldownOptions: { output: { manualChunks: id => id.includes('node_modules/phaser') ? 'phaser' : undefined } },
    chunkSizeWarningLimit: 1600,
  },
});
