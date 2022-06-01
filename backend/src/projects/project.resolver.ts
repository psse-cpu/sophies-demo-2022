import { Query, Resolver } from '@nestjs/graphql'
import { Project } from './project.entity'
import { ProjectsService } from './projects.service'

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query(() => [Project])
  allProjects(): Promise<Project[]> {
    return this.projectsService.allProjects()
  }
}
