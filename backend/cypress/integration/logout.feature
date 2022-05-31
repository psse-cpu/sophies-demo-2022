Feature: Logout

  As a logged-in user
  I want to log out
  so that I can protect my account when not in use

  Background:
    Given the following accounts exist
      | email                | password  | given_name   | family_name  |
      | mike@cpu.edu.ph      | mike      | Mike         | Coo          |
      | richard@cpu.edu.ph   | rich      | Ricardo      | Dalisay      |

  Scenario: Log out
    Given that I'm logged in using "mike@cpu.edu.ph" with password "mike"
    And I'm on the home page
    When I click on the user menu
    And I click Logout
    Then I should be redirected to the home page

  Scenario: Logged out
    Given that I'm not logged-in
    When I visit the home page
    Then I should get redirected to the login page