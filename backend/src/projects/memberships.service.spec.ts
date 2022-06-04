import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { DataSource, Repository, UpdateResult } from 'typeorm'
import { Membership } from './membership.entity'
import { MembershipsService } from './memberships.service'
import { ScrumRole } from './scrum-role.enum'

const mockRepository = {
  update: jest.fn().mockResolvedValue({}),
  save: jest.fn().mockResolvedValue({}),
  findBy: jest.fn().mockResolvedValue([
    {
      id: 1,
      projectId: 4,
      userId: 5,
      scrumRole: ScrumRole.PRODUCT_OWNER,
    },
    {
      id: 1,
      projectId: 4,
      userId: 7,
      scrumRole: ScrumRole.MEMBER,
    },
  ]),
}

const connectSpy = jest.fn().mockResolvedValue(undefined)
const startTransactionSpy = jest.fn().mockResolvedValue(undefined)
const commitTransactionSpy = jest.fn().mockResolvedValue(undefined)
const rollbackTransactionSpy = jest.fn().mockResolvedValue(undefined)
const releaseSpy = jest.fn().mockResolvedValue(undefined)

const mockDataSource = {
  createQueryRunner: jest.fn(() => ({
    connect: connectSpy,
    startTransaction: startTransactionSpy,
    commitTransaction: commitTransactionSpy,
    rollbackTransaction: rollbackTransactionSpy,
    release: releaseSpy,
  })),
}

describe('MembershipsService', () => {
  let membershipService: MembershipsService
  let membershipRepository: Repository<Membership>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MembershipsService,
        {
          provide: getRepositoryToken(Membership),
          useValue: mockRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile()

    membershipService = module.get(MembershipsService)
    membershipRepository = module.get(getRepositoryToken(Membership))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('#addMember()', () => {
    it('demotes a Scrum Master when adding a new one', async () => {
      const spy = jest.spyOn(membershipRepository, 'update')
      await membershipService.addMember({
        projectId: 4,
        userId: 5,
        scrumRole: ScrumRole.SCRUM_MASTER,
      })

      expect(spy).toHaveBeenCalledWith(
        { scrumRole: ScrumRole.SCRUM_MASTER, projectId: 4 },
        { scrumRole: ScrumRole.MEMBER }
      )
    })

    it('demotes a Product Owner when adding a new one', async () => {
      const spy = jest.spyOn(membershipRepository, 'update')
      await membershipService.addMember({
        projectId: 4,
        userId: 5,
        scrumRole: ScrumRole.PRODUCT_OWNER,
      })

      expect(spy).toHaveBeenCalledWith(
        { scrumRole: ScrumRole.PRODUCT_OWNER, projectId: 4 },
        { scrumRole: ScrumRole.MEMBER }
      )
    })

    it('performs the steps in a transaction', async () => {
      jest
        .spyOn(membershipRepository, 'save')
        .mockResolvedValue({} as Membership)
      jest
        .spyOn(membershipRepository, 'update')
        .mockResolvedValue({} as UpdateResult)

      await membershipService.addMember({
        projectId: 4,
        userId: 5,
        scrumRole: ScrumRole.PRODUCT_OWNER,
      })

      expect(connectSpy).toHaveBeenCalled()
      expect(startTransactionSpy).toHaveBeenCalled()
      expect(commitTransactionSpy).toHaveBeenCalled()
      expect(rollbackTransactionSpy).not.toHaveBeenCalled()
      expect(releaseSpy).toHaveBeenCalled()
    })

    it('rolls back when demotion fails', async () => {
      jest
        .spyOn(membershipRepository, 'update')
        .mockRejectedValue(new Error('SQL constraints violation.'))

      await membershipService.addMember({
        projectId: 4,
        userId: 5,
        scrumRole: ScrumRole.PRODUCT_OWNER,
      })

      expect(connectSpy).toHaveBeenCalled()
      expect(startTransactionSpy).toHaveBeenCalled()
      expect(commitTransactionSpy).not.toHaveBeenCalled()
      expect(rollbackTransactionSpy).toHaveBeenCalled()
      expect(releaseSpy).toHaveBeenCalled()
    })

    it('rolls back when adding a new member fails', async () => {
      jest
        .spyOn(membershipRepository, 'save')
        .mockRejectedValue(new Error('SQL constraints violation.'))

      await membershipService.addMember({
        projectId: 4,
        userId: 5,
        scrumRole: ScrumRole.PRODUCT_OWNER,
      })

      expect(connectSpy).toHaveBeenCalled()
      expect(startTransactionSpy).toHaveBeenCalled()
      expect(commitTransactionSpy).not.toHaveBeenCalled()
      expect(rollbackTransactionSpy).toHaveBeenCalled()
      expect(releaseSpy).toHaveBeenCalled()
    })

    it('returns all membership changes', () => {
      jest
        .spyOn(membershipRepository, 'update')
        .mockResolvedValue({} as UpdateResult)
      return expect(
        membershipService.addMember({
          projectId: 4,
          userId: 7,
          scrumRole: ScrumRole.MEMBER,
        })
      ).resolves.toStrictEqual([
        {
          id: 1,
          projectId: 4,
          userId: 5,
          scrumRole: ScrumRole.PRODUCT_OWNER,
        },
        {
          id: 1,
          projectId: 4,
          userId: 7,
          scrumRole: ScrumRole.MEMBER,
        },
      ])
    })

    it('saves the new member correctly', async () => {
      jest
        .spyOn(membershipRepository, 'update')
        .mockResolvedValue({} as UpdateResult)
      jest.spyOn(membershipRepository, 'save').mockResolvedValue({
        id: 5,
        projectId: 4,
        userId: 7,
        scrumRole: ScrumRole.MEMBER,
      } as Membership)

      const spy = jest.spyOn(membershipRepository, 'save')
      await membershipService.addMember({
        projectId: 4,
        userId: 7,
        scrumRole: ScrumRole.MEMBER,
      })
      expect(spy).toHaveBeenCalledWith({
        projectId: 4,
        userId: 7,
        scrumRole: ScrumRole.MEMBER,
      })
    })

    it('saves a new product owner correctly', async () => {
      jest
        .spyOn(membershipRepository, 'update')
        .mockResolvedValue({} as UpdateResult)
      const spy = jest.spyOn(membershipRepository, 'save').mockResolvedValue({
        id: 5,
        projectId: 4,
        userId: 7,
        scrumRole: ScrumRole.PRODUCT_OWNER,
      } as Membership)

      await membershipService.addMember({
        projectId: 4,
        userId: 7,
        scrumRole: ScrumRole.PRODUCT_OWNER,
      })
      expect(spy).toHaveBeenCalledWith({
        projectId: 4,
        userId: 7,
        scrumRole: ScrumRole.PRODUCT_OWNER,
      })
    })

    it('calls findBy correctly', async () => {
      const spy = jest.spyOn(membershipRepository, 'findBy').mockResolvedValue([
        {
          id: 5,
          projectId: 4,
          userId: 7,
          scrumRole: ScrumRole.MEMBER,
        } as Membership,
      ])

      await membershipService.addMember({
        projectId: 4,
        userId: 7,
        scrumRole: ScrumRole.MEMBER,
      })
      expect(spy).toHaveBeenCalledWith({ projectId: 4 })
    })
  })
})
