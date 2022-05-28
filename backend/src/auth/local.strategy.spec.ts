import { UnauthorizedException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { RegistrationSource } from '../users/registration-source'
import { UserWithoutHash } from '../users/user.entity'
import { AuthService } from './auth.service'
import { LocalStrategy } from './local.strategy'

const mockUser = {
  id: 1,
  email: 'mike@foo.bar',
  familyName: 'Coo',
  givenName: 'Mike',
  registrationSource: RegistrationSource.LOCAL,
  createdAt: new Date(),
  updatedAt: new Date(),
}

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy
  let authService: AuthService

  beforeEach(async () => {
    const MockAuthServiceDefinition = {
      provide: AuthService,
      useValue: {
        async authenticate(
          _email: string,
          _password: string
        ): Promise<UserWithoutHash> {
          return mockUser
        },
      },
    }

    const module = await Test.createTestingModule({
      providers: [LocalStrategy, MockAuthServiceDefinition],
    }).compile()

    localStrategy = module.get(LocalStrategy)
    authService = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(localStrategy).toBeDefined()
  })

  describe('#validate', () => {
    it('returns a user when authService#authenticate does so', async () => {
      const result = await localStrategy.validate('mike@foo.bar', 'whatever')
      return expect(result).toBe(mockUser)
    })

    it('throws an UnauthorizedException when authService#authenticate is falsy', async () => {
      jest.spyOn(authService, 'authenticate').mockResolvedValue(undefined)

      return expect(() =>
        localStrategy.validate('mike@foo.bar', 'whatever')
      ).rejects.toThrow(UnauthorizedException)
    })
  })
})
