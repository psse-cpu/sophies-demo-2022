import {
  Given,
  When,
  Then,
  After,
} from '@badeball/cypress-cucumber-preprocessor'
import { User } from '../../src/users/user.entity'

After(function clearUser() {
  this.user = undefined
})

Given("that I'm not logged-in", () => {
  localStorage.clear()
})

Given(/(that )?I'm on the login page/, () => {
  cy.visit('/guest/login')
})

When(
  'I login with {string} and {string}',
  function completeForm(username: string, password: string) {
    this.myEmail = username
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

Then(
  'I should see myself as the currently logged-in user',
  function checkCurrentUser() {
    const me = this.users.find((user: User) => user.email === this.myEmail)
    cy.get('[data-testid="my-name"').should('have.text', me!.givenName)
  }
)
