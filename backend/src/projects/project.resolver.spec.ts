import { Test } from '@nestjs/testing'
import { User } from '../users/user.entity'
import { Project } from './project.entity'
import { ProjectResolver } from './project.resolver'
import { ProjectsService } from './projects.service'

const mockProjectService = {
  allProjects: jest.fn(),
  findByUserId: jest.fn(),
  createProjectWithOwner: jest.fn(),
}

const mockProject: Project = {
  id: 3,
  name: 'Nami nga project',
  description: 'Lawlaw nga project  hehehe',
  sprintLength: 2,
  createdAt: new Date(),
  updatedAt: new Date(),
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

  describe('#myProjects()', () => {
    it('calls the service method correctly', async () => {
      const spy = jest.spyOn(projectsService, 'findByUserId')
      await projectResolver.myProjects({ id: 55, email: 'foo@bar.baz' } as User)
      expect(spy).toHaveBeenCalledWith(55)
    })

    it('returns whatever the service returns', async () => {
      jest
        .spyOn(projectsService, 'findByUserId')
        .mockResolvedValue([mockProject])

      return expect(
        projectResolver.myProjects({ id: 55, email: 'foo@bar.baz' } as User)
      ).resolves.toStrictEqual([mockProject])
    })
  })

  describe('#createProject', () => {
    it('calls the service method correctly', async () => {
      const spy = jest.spyOn(projectsService, 'createProjectWithOwner')
      await projectResolver.createProject(
        {
          name: 'tahom system',
          description: 'tahom3x gid kaayo',
          sprintLength: 2,
        },
        { id: 7, email: 'mike@cpu.edu.ph' } as User
      )

      expect(spy).toHaveBeenCalledWith(
        {
          name: 'tahom system',
          description: 'tahom3x gid kaayo',
          sprintLength: 2,
        },
        7
      )
    })

    it('returns the created project', async () => {
      jest
        .spyOn(projectsService, 'createProjectWithOwner')
        .mockResolvedValue(mockProject)

      return expect(
        projectResolver.createProject(
          {
            name: 'tahom system',
            description: 'tahom3x gid kaayo',
            sprintLength: 2,
          },
          { id: 7, email: 'mike@cpu.edu.ph' } as User
        )
      ).resolves.toStrictEqual(mockProject)
    })
  })
})
