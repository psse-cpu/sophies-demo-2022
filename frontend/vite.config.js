const { quasar, transformAssetUrls } = require('@quasar/vite-plugin')
const commonjs = require('vite-plugin-commonjs').default
const { defineConfig } = require('vitest/config')
const vue = require('@vitejs/plugin-vue')
const tsconfigPaths = require('vite-tsconfig-paths').default

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
    },
  },
  optimizeDeps: {
    include: ['typeorm', '@nestjs/graphql'],
  },
  build: {
    commonjsOptions: {
      include: [/typeorm/, /@nestjs\/graphql/, /node_modules/],
    },
    sourcemap: true,
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/css/quasar.variables.scss',
    }),
    commonjs(),
    tsconfigPaths(),
  ],
})
