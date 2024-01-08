import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },

  // use rollupoptions
  // rollupInputOptions: {

  // pluginOptions: {
  //   electronBuilder: {
  //     preload : 'src/preload.js',
  //   },
  // },
  // proxy
  server: {
    proxy: {
      '/': {
        target: 'https://smallworlds.app',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://smallworlds.app',
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/space': {
        target: 'https://smallworlds.app',
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/space/, ''),
      },
      
    },

  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@stores': path.resolve(__dirname, 'src/stores'),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});
