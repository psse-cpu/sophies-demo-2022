import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from './project.entity'
import { ProjectsService } from './projects.service'

const innerJoinAndSelectSpy = jest.fn().mockReturnThis()
const whereSpy = jest.fn().mockReturnThis()
const getManySpy = jest.fn()

const mockProjectRepo = {
  find: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    innerJoinAndSelect: innerJoinAndSelectSpy,
    where: whereSpy,
    getMany: getManySpy,
  })),
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
})
