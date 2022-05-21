import { UnauthorizedException } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { UserWithoutHash } from '../users/user.entity'
import { AuthService } from './auth.service'
import { GoogleIdToken, GoogleOauthStrategy } from './google-oauth.strategy'

const mockUser = { id: 1, email: 'mike@foo.bar' }

describe('GoogleOAuthStrategy', () => {
  let googleStrategy: GoogleOauthStrategy
  let authService: AuthService

  beforeEach(async () => {
    const MockAuthServiceDefinition = {
      provide: AuthService,
      useValue: {
        async handleProviderLogin(
          _email: string,
          _provider: string
        ): Promise<UserWithoutHash> {
          return mockUser
        },
      },
    }

    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        ConfigService,
        GoogleOauthStrategy,
        MockAuthServiceDefinition,
      ],
    }).compile()

    googleStrategy = module.get(GoogleOauthStrategy)
    authService = module.get(AuthService)
  })

  it('should be defined', () => {
    expect(googleStrategy).toBeDefined()
  })

  describe('#validate', () => {
    it('returns a user when authService#handleProviderLogin does so', async () => {
      jest.spyOn(authService, 'handleProviderLogin').mockResolvedValue(mockUser)
      const result = await googleStrategy.validate({} as GoogleIdToken, '')
      return expect(result).toBe(mockUser)
    })

    it('throws an UnauthorizedException when handleProviderLogin throws', async () => {
      jest.spyOn(authService, 'handleProviderLogin').mockImplementation(() => {
        throw new Error('mocked error')
      })

      return expect(() =>
        googleStrategy.validate({} as GoogleIdToken, '')
      ).rejects.toThrow(UnauthorizedException)
    })
  })
})
