import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { User } from './user.entity'
import { RegistrationSource } from './registration-source'

jest.mock('bcrypt', () => ({
  hash: async (_plainTextPassword: string, _rounds: number) => 'hashedPassword',
}))

// TODO: remove  hack
const hack = {
  familyName: '',
  givenName: '',
  registrationSource: RegistrationSource.LOCAL,
  createdAt: new Date(),
  updatedAt: new Date(),
}

const mockUsers: User[] = [
  {
    id: 1,
    email: 'foo@bar.baz',
    passwordHash: 'asdf',
    ...hack,
  },
  {
    id: 2,
    email: 'quux@bar.baz',
    passwordHash: 'qwer',
    ...hack,
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('#findByEmail', () => {
    it('returns whatever repo#fidnOne returns', () => {
      return expect(service.findByEmail('asdf')).resolves.toBe(mockUsers[0])
    })

    it('gives the correct arguments to repository#find', async () => {
      const spy = jest.spyOn(repository, 'findOne')
      await service.findByEmail('asdf')
      expect(spy).toHaveBeenCalledWith({ where: { email: 'asdf' } })
    })
  })

  describe('#register', () => {
    it('returns whatever repo#save returns', () => {
      return expect(service.register('what', 'ever')).resolves.toBe(
        mockUsers[0]
      )
    })

    it('calls save on the repository with the correct args', async () => {
      const spy = jest.spyOn(repository, 'save')
      await service.register('leni@foo.bar', 'angatbuhay', hack)

      expect(spy).toHaveBeenCalledWith({
        email: 'leni@foo.bar',
        passwordHash: 'hashedPassword',
        ...hack,
      })
    })
  })
})
