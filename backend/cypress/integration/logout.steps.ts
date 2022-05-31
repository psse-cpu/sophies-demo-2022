import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('I should get redirected to the login page', () => {
  cy.location('pathname').should('equal', '/guest/login')
})
