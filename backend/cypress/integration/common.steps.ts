import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import localforage from 'localforage'

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'Sophies Demo',
  version: 1,
  storeName: 'sophies_demo',
  description: 'Sophies Demo Local Forage',
})

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

Given("(that )I'm on the home page", () => {
  cy.visit('/')
})

Given(
  "that I'm logged in using {string} with password {string}",
  (email, password) => {
    // TODO: use env var for the possibility of E2E against staging
    cy.request('POST', 'http://localhost:3000/auth/login', {
      email,
      password,
    }).then((response) => {
      localforage.setItem('currentUser', response.body)
    })
  }
)

Given("that I'm not logged-in", () => {
  localStorage.clear()
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

When('I visit the home page', () => {
  cy.visit('/')
})

When(/i click (.+)$/i, (label: string) => {
  if (label.endsWith('user menu')) {
    cy.get('[data-testid="me-dropdown"]').click()
  } else {
    cy.contains(label, { matchCase: false }).click()
  }
})

When('I submit the form', () => {
  cy.screenshot()
  cy.get('form button[type="submit"]').click()
})

Then('I should be redirected to the home page', () => {
  cy.location('pathname').should('equal', '/')
})
