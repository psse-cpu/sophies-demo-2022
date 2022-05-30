module.exports = {
  stepDefinitions: [
    'cypress/integration/[filepath]/**/*.steps.{js,ts}',
    'cypress/integration/[filepath].steps.{js,ts}',
    'cypress/integration/common.steps.{js,ts}',
    'cypress/support/step_definitions/**/*.steps.{js,ts}',
  ],
  json: {
    enabled: !process.env.ON_GITHUB_ACTIONS,
    output: 'cypress/.run/cucumber-report.json',
  },
}
