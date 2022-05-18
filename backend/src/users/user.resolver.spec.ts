import { Test } from '@nestjs/testing'
import { UserWithoutHash } from './user.entity'
import { UserResolver } from './user.resolver'
import { UsersService } from './users.service'

const mockUser: UserWithoutHash = {
  id: 1,
  email: 'fifi@cpu.ph',
}

const mockUsersService = {
  allUsers: jest.fn().mockResolvedValue([mockUser]),
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
      return expect(resolver.users()).resolves.toStrictEqual([
        { id: 1, email: 'fifi@cpu.ph' },
      ])
    })
  })
})
