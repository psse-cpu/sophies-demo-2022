import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

type AccountRow = [email: string, password: string]

Given('the following accounts exist', ({ rawTable }) => {
  const users = rawTable
    .slice(0)
    .map(([email, password]: AccountRow) => ({ email, password }))

  cy.task('seed', ['user', users], { log: true })
})

Given("that I'm not logged-in", () => {
  localStorage.clear()
})

Given(/(that )?I'm on the login page/, () => {
  cy.visit('/guest/login')
})

When(
  'I login with {string} and {string}',
  (username: string, password: string) => {
    cy.get('[data-testid="email-input"]').type(username)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('button').contains('Sign-in').click()
  }
)

Then('I should see an error message {string}', (_error) => {
  cy.contains('Invalid username or password.')
  cy.get('[data-testid="auth-errors"]').should(
    'contain',
    'Invalid username or password.'
  )
})

Then('I should be redirected to the home page', () => {
  cy.location('pathname').should('equal', '/')
})
