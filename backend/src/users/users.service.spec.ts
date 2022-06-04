import { Test, TestingModule } from '@nestjs/testing'
import { ILike, Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { User } from './user.entity'
import { RegistrationSource } from './registration-source'

jest.mock('bcrypt', () => ({
  hash: async (_plainTextPassword: string, _rounds: number) => 'hashedPassword',
}))

const mockUsers: User[] = [
  {
    id: 1,
    email: 'foo@bar.baz',
    passwordHash: 'asdf',
    familyName: 'Too',
    givenName: 'Foo',
    registrationSource: RegistrationSource.LOCAL,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: 'quux@bar.baz',
    passwordHash: 'qwer',
    familyName: 'X',
    givenName: 'Quu',
    registrationSource: RegistrationSource.LOCAL,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

const mockRepository = {
  findBy: jest.fn().mockResolvedValue(mockUsers),
  find: jest.fn().mockResolvedValue(mockUsers),
  save: jest.fn().mockResolvedValue(mockUsers[0]),
  delete: jest.fn().mockResolvedValue(mockUsers[0]),
  countBy: jest.fn(),
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
      const spy = jest.spyOn(repository, 'findBy')
      await service.findByEmail('asdf')
      expect(spy).toHaveBeenCalledWith({ email: 'asdf' })
    })
  })

  describe('#register', () => {
    it('returns whatever repo#save returns', () => {
      return expect(
        service.register({
          email: 'foo@bar.baz',
          password: 'asdf',
          familyName: 'Too',
          givenName: 'Foo',
          registrationSource: RegistrationSource.LOCAL,
        })
      ).resolves.toBe(mockUsers[0])
    })

    it('calls save on the repository with the correct args', async () => {
      const spy = jest.spyOn(repository, 'save')
      await service.register({
        email: 'leni@foo.bar',
        password: 'angatbuhay', // NOTE the difference
        familyName: 'Robredo',
        givenName: 'Leni',
        registrationSource: RegistrationSource.LOCAL,
      })

      expect(spy).toHaveBeenCalledWith({
        email: 'leni@foo.bar',
        passwordHash: 'hashedPassword', // NOTE the difference
        familyName: 'Robredo',
        givenName: 'Leni',
        registrationSource: RegistrationSource.LOCAL,
      })
    })
  })

  describe('#emailExists()', () => {
    it('returns true when the repository counts 1', () => {
      jest.spyOn(repository, 'countBy').mockResolvedValue(1)
      return expect(service.emailExists('some@cpu.edu.ph')).resolves.toBe(true)
    })

    it('returns true when the repository counts 0', () => {
      jest.spyOn(repository, 'countBy').mockResolvedValue(0)
      return expect(service.emailExists('some@cpu.edu.ph')).resolves.toBe(false)
    })

    it('calls the count method correctly', async () => {
      const spy = jest.spyOn(repository, 'countBy')
      await service.emailExists('some@cpu.edu.ph')
      expect(spy).toHaveBeenCalledWith({ email: 'some@cpu.edu.ph' })
    })
  })

  describe('#searchUsers()', () => {
    it('returns whatever the repository returns', () => {
      return expect(service.searchUsers('bar')).resolves.toStrictEqual(
        mockUsers
      )
    })

    it('calls the find method correctly', async () => {
      const spy = jest.spyOn(repository, 'find')
      await service.searchUsers('mike')
      expect(spy).toHaveBeenCalledWith({
        where: [
          { givenName: ILike('mike%') },
          { familyName: ILike('mike%') },
          { email: ILike('mike%') },
        ],
      })
    })
  })
})
