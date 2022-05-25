Feature: Login

  As a user
  I want to login with my username and password
  So that I can be authenticated as a legitimate user

  Background:
    Given the following accounts exist
      | email                | password        |
      | mike@cpu.edu.ph      | mike            |
      | richard@cpu.edu.ph   | rich            |

  Scenario Outline: Wrong credentials
    Given that I'm not logged-in
    And that I'm on the login page
    When I login with "<username>" and "<password>"
    Then I should see an error message "Invalid username or password."

    Examples:
      | username        | password |
      | foo@wrong.ph    | wrong    |
      | mike@cpu.edu.ph | Mike     |

  Scenario: Correct credentials
    Given that I'm not logged-in
    And I'm on the login page
    When I login with "richard@cpu.edu.ph" and "rich"
    Then I should be redirected to the home page
