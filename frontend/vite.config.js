const { quasar, transformAssetUrls } = require('@quasar/vite-plugin')
const commonjs = require('vite-plugin-commonjs').default
const { defineConfig } = require('vitest/config')
const vue = require('@vitejs/plugin-vue')

const path = require('path')

// https://vitejs.dev/config/

module.exports = defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    coverage: {
      reporter: ['lcov', 'text', 'json-summary'],
    },
  },
  // TODO:  deduplicate with quasar.config.js
  resolve: {
    alias: {
      typeorm: path.resolve(
        __dirname,
        '../backend/node_modules/typeorm/typeorm-model-shim.js'
      ),
      '@nestjs/graphql': path.resolve(
        __dirname,
        '../backend/node_modules/@nestjs/graphql/dist/extra/graphql-model-shim.js'
      ),
      src: path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['typeorm', '@nestjs/graphql'],
  },
  build: {
    commonjsOptions: {
      include: [/typeorm/, /@nestjs\/graphql/, /node_modules/],
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
    commonjs(),
  ],
})
