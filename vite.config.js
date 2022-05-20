import { defineConfig } from 'vite';
import { resolve } from 'path';
import mpa from 'vite-plugin-mpa';
import autoprefixer from 'autoprefixer';

const plugins =
  process.env.NODE_ENV === 'production'
    ? []
    : [
        mpa({
          scanDir: 'examples',
          open: '/examples/',
        }),
      ];

export default defineConfig({
  plugins,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import 'src/core/mixins';
        @import 'src/core/functions';
        @import 'src/core/variables';
      `,
      },
    },
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    emptyOutDir: false,
    outDir: 'dist/',
    target: 'es6',
    lib: {
      name: 'NeuAxentix',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'umd' ? `neu-axentix.min.js` : `neu-axentix.esm.js`),
      entry: resolve(__dirname, `src/index.ts`),
    },
    rollupOptions: {
      output: {
        assetFileNames: `neu-axentix.min.[ext]`,
      },
    },
  },
});
