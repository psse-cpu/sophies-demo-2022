import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import commonjs from 'vite-plugin-commonjs'
import path from 'node:path'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export -- config file
export default defineConfig({
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
        __dirname, // eslint-disable-line unicorn/prefer-module -- a config file!
        '../backend/node_modules/typeorm/typeorm-model-shim.js'
      ),
      '@nestjs/graphql': path.resolve(
        __dirname, // eslint-disable-line unicorn/prefer-module -- a config file!
        '../backend/node_modules/@nestjs/graphql/dist/extra/graphql-model-shim.js'
      ),
      src: path.resolve(
        __dirname, // eslint-disable-line unicorn/prefer-module -- a config file!
        './src'
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
