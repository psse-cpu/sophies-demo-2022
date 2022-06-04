import { Test } from '@nestjs/testing'
import { MembershipResolver } from './membership.resolver'
import { MembershipsService } from './memberships.service'
import { ScrumRole } from './scrum-role.enum'

const mockMembers = [
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
]

const mockService = {
  addMember: jest.fn().mockResolvedValue(mockMembers),
}

describe('MembershipResolver', () => {
  let membershipResolver: MembershipResolver
  let membershipsService: MembershipsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MembershipResolver,
        {
          provide: MembershipsService,
          useValue: mockService,
        },
      ],
    }).compile()

    membershipResolver = module.get(MembershipResolver)
    membershipsService = module.get(MembershipsService)
  })

  describe('#addMember()', () => {
    it('adds a member', () => {
      return expect(
        membershipResolver.addMember({
          projectId: 4,
          userId: 7,
          scrumRole: ScrumRole.MEMBER,
        })
      ).resolves.toStrictEqual(mockMembers)
    })

    it('calls the service method correctly', async () => {
      const spy = jest.spyOn(membershipsService, 'addMember')
      await membershipResolver.addMember({
        projectId: 88,
        userId: 99,
        scrumRole: ScrumRole.SCRUM_MASTER,
      })

      expect(spy).toHaveBeenCalledWith({
        projectId: 88,
        userId: 99,
        scrumRole: ScrumRole.SCRUM_MASTER,
      })
    })
  })
})
