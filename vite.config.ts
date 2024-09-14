import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: 'theme-ui',
    jsxRuntime: 'automatic'
  })],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/index.ts',
      name: 'cssgui',
      fileName: 'index',
      formats: ['es'],
    },
  }
});
