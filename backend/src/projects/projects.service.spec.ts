import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from './project.entity'
import { ProjectsService } from './projects.service'

const mockProjectRepo = {
  find: jest.fn(),
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
})
