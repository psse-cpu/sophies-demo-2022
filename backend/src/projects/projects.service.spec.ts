import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Membership } from './membership.entity'
import { ScrumRole } from './scrum-role.enum'
import { Project } from './project.entity'
import { ProjectsService } from './projects.service'

const innerJoinAndSelectSpy = jest.fn().mockReturnThis()
const whereSpy = jest.fn().mockReturnThis()
const getManySpy = jest.fn()
const saveSpy = jest.fn()

const mockProjectRepo = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    innerJoinAndSelect: innerJoinAndSelectSpy,
    where: whereSpy,
    getMany: getManySpy,
  })),
  save: saveSpy,
}

const mockProject = {
  name: 'awesome project hala bira iloio nice',
  id: '14',
  description: 'cool cool cool',
  sprintLength: 2,
  createdAt: '2022-06-01T21:20:21.128Z',
}

const mockProjectWithOwner = {
  ...mockProject,
  memberships: [
    {
      user: {
        id: 1,
        familyName: 'Coo',
        givenName: 'Mike',
      },
    },
  ],
}

describe('ProjectsService', () => {
  let projectsService: ProjectsService
  let projectRepository: Repository<Project>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepo,
        },
      ],
    }).compile()

    projectsService = module.get(ProjectsService)
    projectRepository = module.get(getRepositoryToken(Project))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(projectsService).toBeDefined()
  })

  describe('#allProjects()', () => {
    it('delegates to repository#find', async () => {
      const spy = jest.spyOn(projectRepository, 'find')
      await projectsService.allProjects()
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('#findProjectsByUserId()', () => {
    it('calls the query builder chain correctly', async () => {
      const queryBuilderSpy = jest.spyOn(
        projectRepository,
        'createQueryBuilder'
      )

      getManySpy.mockResolvedValue([
        { id: 1, name: 'awesome project', description: 'cool cool cool' },
      ])

      await projectsService.findByUserId(42)

      expect(queryBuilderSpy).toHaveBeenCalledWith('project')

      expect(innerJoinAndSelectSpy).toHaveBeenCalledWith(
        'project.memberships',
        'membership'
      )
      expect(whereSpy).toHaveBeenCalledWith('membership.user_id = :id', {
        id: 42,
      })
      expect(getManySpy).toHaveBeenCalled()
    })

    it('finds projects by user id', () => {
      getManySpy.mockResolvedValue([
        { id: 1, name: 'awesome project', description: 'cool cool cool' },
      ])

      return expect(projectsService.findByUserId(1)).resolves.toStrictEqual([
        { id: 1, name: 'awesome project', description: 'cool cool cool' },
      ])
    })
  })

  describe('#createProjectWithOwner()', () => {
    it('returns the saved project', async () => {
      saveSpy.mockResolvedValue(mockProjectWithOwner)

      return expect(
        projectsService.createProjectWithOwner(
          {
            name: 'awesome project hala bira iloio nice',
            description: 'cool cool cool',
            sprintLength: 2,
          },
          3
        )
      ).resolves.toStrictEqual(mockProjectWithOwner)
    })

    it('calls save with the correct nested object', async () => {
      await projectsService.createProjectWithOwner(
        {
          name: 'nami akon project',
          description: 'nami nami gid ya 1.0 kay sir',
          sprintLength: 2,
        },
        7
      )

      const expectedProject = new Project()

      Object.assign(expectedProject, {
        name: 'nami akon project',
        description: 'nami nami gid ya 1.0 kay sir',
        sprintLength: 2,
        memberships: [
          Object.assign(new Membership(), {
            project: expectedProject,
            scrumRole: ScrumRole.SCRUM_MASTER,
            userId: 7,
          }),
        ],
      })

      expect(saveSpy).toHaveBeenCalledWith(expectedProject)
    })
  })

  describe('#findByProjectId()', () => {
    it('returns the project given its ID', () => {
      jest
        .spyOn(projectRepository, 'findOneBy')
        .mockResolvedValue(mockProject as unknown as Project)

      return expect(projectsService.findByProjectId(3)).resolves.toStrictEqual(
        mockProject
      )
    })

    it('returns null if the service returns null', () => {
      // eslint-disable-next-line unicorn/no-null -- that's the TypeORM return
      jest.spyOn(projectRepository, 'findOneBy').mockResolvedValue(null)
      return expect(projectsService.findByProjectId(3)).resolves.toBeNull()
    })

    it('calls findOneBy with the correct args', async () => {
      const spy = jest.spyOn(projectRepository, 'findOneBy')
      await projectsService.findByProjectId(38)
      expect(spy).toHaveBeenCalledWith({ id: 38 })
    })
  })
})
