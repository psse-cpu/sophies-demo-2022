import { Test } from '@nestjs/testing'
import { RegistrationSource } from './registration-source'
import { UserWithoutHash } from './user-without-hash.dto'
import { UserResolver } from './user.resolver'
import { UsersService } from './users.service'

const mockUser: UserWithoutHash = {
  id: 1,
  email: 'fifi@cpu.ph',
  familyName: 'Coo',
  givenName: 'Fifi',
  createdAt: new Date(),
  updatedAt: new Date(),
  registrationSource: RegistrationSource.LOCAL,
}

const mockUsersService = {
  allUsers: jest.fn().mockResolvedValue([mockUser]),
  register: jest.fn().mockResolvedValue(mockUser),
  emailExists: jest.fn().mockResolvedValue(true),
}

describe('UserResolver', () => {
  let resolver: UserResolver

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile()

    resolver = module.get(UserResolver)
  })

  describe('#users()', () => {
    it('returns all users', () => {
      return expect(resolver.users()).resolves.toStrictEqual([mockUser])
    })
  })

  describe('#register()', () => {
    it('registers a user', () => {
      return expect(
        resolver.register({
          email: 'fifi@cpu.ph',
          password: 'anypass',
          familyName: 'Coo',
          givenName: 'Fifi',
          registrationSource: RegistrationSource.GOOGLE, // is overriden
        })
      ).resolves.toStrictEqual(mockUser)
    })
  })

  describe('#emailExists()', () => {
    it('is true when the service method returns true', () => {
      jest.spyOn(mockUsersService, 'emailExists').mockResolvedValue(true)
      return expect(resolver.emailExists('some@cpu.edu.ph')).resolves.toBe(true)
    })

    it('is false when the service method returns false', () => {
      jest.spyOn(mockUsersService, 'emailExists').mockResolvedValue(false)
      return expect(resolver.emailExists('some@cpu.edu.ph')).resolves.toBe(
        false
      )
    })

    it('calls the service method correctly', async () => {
      const spy = jest
        .spyOn(mockUsersService, 'emailExists')
        .mockResolvedValue(false)
      await mockUsersService.emailExists('some@cpu.edu.ph')
      expect(spy).toHaveBeenCalledWith('some@cpu.edu.ph')
    })
  })
})
