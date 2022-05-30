import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given(/(that )?I'm on the regist(?:er|ration) page/, () => {
  cy.visit('/guest/register')
})

Then(
  'I should see myself \\({string}\\) as the currently logged-in user',
  (givenName) => {
    cy.get('[data-testid="my-name"').should('have.text', givenName)
  }
)

Then('I should see an error {string}', (message) => {
  cy.get('form').should('contain.text', message)
})
