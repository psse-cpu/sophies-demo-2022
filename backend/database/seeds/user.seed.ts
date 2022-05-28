import { RegistrationSource } from '../../src/users/registration-source'
import { User } from '../../src/users/user.entity'

type Registrant = Omit<
  User,
  'id' | 'passwordHash' | 'createdAt' | 'updatedAt'
> & { password: string }

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
