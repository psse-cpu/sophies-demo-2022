import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

type AccountRow = [
  email: string,
  password: string,
  givenName: string,
  firstName: string
]

Given('the following accounts exist', function seedDatabase({ rawTable }) {
  this.users = rawTable
    .slice(1)
    .map(([email, password, givenName, familyName]: AccountRow) => ({
      email,
      password,
      givenName,
      familyName,
      registrationSource: 'local',
    }))

  cy.task('seed', { tableName: 'user', data: this.users }, { log: true })
})

// TODO: get by label is friendlier to test engineers, and less flaky
// labels: tech-debt, enhancement
// here the frontend engineers will have to follow a certain convention
// reference to get by label: https://glebbahmutov.com/cypress-examples/6.5.0/recipes/form-input-by-label.html#complex-custom-command-with-retries
When(
  /^(?:i (?:enter|type) )?"([^"]+)" as (.+)$/i,
  (value: string, field: string) => {
    const selector = `[data-testid="${field.replaceAll(' ', '-')}-input"]`
    cy.get(selector).type(value)
  }
)

Then('I should be redirected to the home page', () => {
  cy.location('pathname').should('equal', '/')
})

When('I submit the form', () => {
  cy.get('form button[type="submit"]').click()
})
