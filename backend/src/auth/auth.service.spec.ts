import { Test, TestingModule } from '@nestjs/testing'

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile()

    authService = module.get(AuthService)
    usersService = module.get(UsersService)
  })

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
})
