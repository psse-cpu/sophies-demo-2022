import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { User } from './user.entity'

const mockUsers: User[] = [
  {
    id: 1,
    email: 'foo@bar.baz',
    passwordHash: 'asdf',
  },
  {
    id: 2,
    email: 'quux@bar.baz',
    passwordHash: 'qwer',
  },
]
const mockRepository = {
  find: jest.fn().mockResolvedValue(mockUsers),
  findOne: jest.fn().mockResolvedValue(mockUsers[0]),
  save: jest.fn().mockResolvedValue(mockUsers[0]),
  delete: jest.fn().mockResolvedValue(mockUsers[0]),
}

describe('UsersService', () => {
  let service: UsersService
  let repository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('#findByEmail', () => {
    it('returns the first mock user', () => {
      expect(service.findByEmail('asdf')).resolves.toBe(mockUsers[0])
    })

    it('gives the correct arguments to repository#find', () => {
      const spy = jest.spyOn(repository, 'findOne')
      service.findByEmail('asdf')
      expect(spy).toBeCalledWith({ where: { email: 'asdf' } })
    })
  })
})
