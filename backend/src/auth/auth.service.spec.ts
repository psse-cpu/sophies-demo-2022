import crypto from 'crypto'

import { Test, TestingModule } from '@nestjs/testing'

import { ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'

const mockUser: User = { id: 1, email: 'mike@foo.bar', passwordHash: 'hash' }

jest.mock('bcrypt', () => ({
  compare: async (_plain: string, _hashed: string) => _plain === 'correct',
}))

describe('AuthService', () => {
  let authService: AuthService
  let usersService: UsersService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'haha',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        ConfigService,
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile()

    authService = module.get(AuthService)
    usersService = module.get(UsersService)
    jwtService = module.get(JwtService)
  })

  afterEach(() => jest.clearAllMocks())

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('#authenticate', () => {
    it('returns undefined if username is invalid (undefined user)', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined)

      const result = await authService.authenticate('mike@foo.bar', 'correct')
      expect(result).toBe(undefined)
    })

    it('returns undefined for a valid email (truthy user), but invalid password', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser)

      const result = await authService.authenticate('mike@foo.bar', 'wrong')
      expect(result).toBeUndefined()
    })

    it('returns undefined for a valid email (truthy user) and correct password', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser)

      const result = await authService.authenticate('mike@foo.bar', 'correct')
      expect(result).toEqual({ id: 1, email: 'mike@foo.bar' })
    })

    it('returns users without the passwordHash field', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser)

      const result = await authService.authenticate('mike@foo.bar', 'correct')
      expect(result).not.toHaveProperty('passwordHash')
    })
  })

  describe('#handleProviderLogin()', () => {
    it('throws an Error if email is falsy', () => {
      expect(() =>
        authService.handleProviderLogin('', 'google-oauth')
      ).rejects.toThrow(/no email found with google-oauth/i)
    })

    it('logs-in via email for registered users', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser)

      const result = await authService.handleProviderLogin(
        'mike@foo.bar',
        'google-oauth'
      )
      expect(result).toEqual({ id: 1, email: 'mike@foo.bar' })
    })

    it('registers and logs-in via email for unregistered users', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined)
      jest.spyOn(usersService, 'register').mockResolvedValue(mockUser)

      const result = await authService.handleProviderLogin(
        'mike@foo.bar',
        'google-oauth'
      )
      expect(result).toEqual({ id: 1, email: 'mike@foo.bar' })
    })

    it('calls findByEmail with the correct args', async () => {
      const findByEmailSpy = jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue(mockUser)
      const registerSpy = jest.spyOn(usersService, 'register')

      await authService.handleProviderLogin('mike@foo.bar', 'google-oauth')

      await authService.handleProviderLogin('mike@foo.bar', 'google-oauth')
      expect(findByEmailSpy).toBeCalledWith('mike@foo.bar')
      expect(registerSpy).not.toHaveBeenCalled()
    })

    it('calls register with the correct args', async () => {
      jest.spyOn(crypto, 'randomUUID').mockReturnValue('randomuuid-ftw')
      const findByEmailSpy = jest
        .spyOn(usersService, 'findByEmail')
        .mockResolvedValue(undefined)
      const registerSpy = jest
        .spyOn(usersService, 'register')
        .mockResolvedValue(mockUser)

      await authService.handleProviderLogin('joke@foo.bar', 'google-oauth')
      expect(findByEmailSpy).toBeCalledWith('joke@foo.bar')
      expect(registerSpy).toBeCalledWith('joke@foo.bar', 'randomuuid-ftw')
    })
  })

  describe('#signJwt()', () => {
    it('signs a JWT', () => {
      jest.spyOn(jwtService, 'sign').mockReturnValue('some-jwt')
      return expect(
        authService.signJwt({ id: 1, email: 'mike@foo.bar' })
      ).resolves.toEqual({
        accessToken: 'some-jwt',
      })
    })

    it('calls jwtService#sign with the correct args', async () => {
      const spy = jest.spyOn(jwtService, 'sign')
      await authService.signJwt({ id: 3, email: 'john@snow.ph' })
      expect(spy).toBeCalledWith({ email: 'john@snow.ph', sub: 3 })
    })
  })
})
