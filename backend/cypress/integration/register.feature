Feature: Register User

As a Agile practitioner
I want to register to ShipThat
so that I can use its features to aid me

Background:
  Given the following accounts exist
    | email                | password  | given_name   | family_name  |
    | mike@cpu.edu.ph      | mike      | Mike         | Coo          |
    | richard@cpu.edu.ph   | rich      | Ricardo      | Dalisay      |

Scenario: happy path
  Given that I'm on the register page
  When I enter "fifi@cpu.edu.ph" as email
  And I enter "feef" as password
  And "Fifi" as given name
  And "Coo" as family name
  And I submit the form
  Then I should be redirected to the home page
  And I should see myself ("Fifi") as the currently logged-in user

# if you want to test a lot of registrations
Scenario Outline: test a bunch of users
  Given that I'm on the register page
  When I enter "<email>" as email
  And I enter "<password>" as password
  And "<given name>" as given name
  And "<family name>" as family name
  And I submit the form
  Then I should be redirected to the home page
  And I should see myself ("<given name>") as the currently logged-in user

  Examples:
    | email                   | password    | given name      | family name   |
    | elon@musk.com           | elonrulez   | Elon            | Musk          |
    | rmcoo@cpu.edu.ph        | mike!       | Richard Michael | Coo           |
    | dumbledore@hogwarts.uk  | Avada!      | Albus Wulfric   | dumbledore    |

  Scenario: email already exists
    Given that I'm on the register page
    When I enter "mike@cpu.edu.ph" as email
    Then I should see an error "Email already taken"