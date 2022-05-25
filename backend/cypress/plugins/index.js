/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const browserify = require('@cypress/browserify-preprocessor')
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor')
const {
  preprocessor,
} = require('@badeball/cypress-cucumber-preprocessor/browserify')
const { seeder } = require('../../database/cypress-seeder')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = async (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    preprocessor(config, {
      ...browserify.defaultOptions,
      typescript: require.resolve('typescript'),
    })
  )

  on('task', {
    seed([table, data]) {
      // NOTE: 👆 is different (destructured)
      return seeder(table, data)
    },
  })

  // Make sure to return the config object as it might have been modified by the plugin.
  return config
}
