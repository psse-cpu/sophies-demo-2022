import { Registrant } from 'src/users/registrant.dto'
import { RegistrationSource } from '../../src/users/registration-source'

export const sampleData: Registrant[] = [
  {
    email: 'mike@cpu.edu.ph',
    password: 'lol',
    familyName: 'Coo',
    givenName: 'Richard Michael',
    registrationSource: RegistrationSource.LOCAL,
  },
  {
    email: 'fifi@cpu.edu.ph',
    password: 'fifimari',
    familyName: 'Yap',
    givenName: 'Fifi Marie',
    registrationSource: RegistrationSource.LOCAL,
  },
]

export { User as entityClass } from '../../src/users/user.entity'
