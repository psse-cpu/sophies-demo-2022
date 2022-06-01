import { Test } from '@nestjs/testing'
import { ProjectResolver } from './project.resolver'
import { ProjectsService } from './projects.service'

const mockProjectService = {
  allProjects: jest.fn(),
}

describe('ProjectResolver', () => {
  let projectResolver: ProjectResolver
  let projectsService: ProjectsService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        {
          provide: ProjectsService,
          useValue: mockProjectService,
        },
      ],
    }).compile()

    projectResolver = module.get(ProjectResolver)
    projectsService = module.get(ProjectsService)
  })

  it('should be defined', () => {
    expect(projectResolver).toBeDefined()
  })

  describe('#allProjects()', () => {
    it('delegates to service#allProjects', async () => {
      const spy = jest.spyOn(projectsService, 'allProjects')
      await projectResolver.allProjects()
      expect(spy).toHaveBeenCalled()
    })
  })
})
