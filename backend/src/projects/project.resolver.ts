import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../users/current-user.decorator'
import { User } from '../users/user.entity'
import { JwtGuard } from '../auth/jwt.guard'
import { Project } from './project.entity'
import { ProjectsService } from './projects.service'
import { ProjectInput } from './project-input.dto'

@UseGuards(JwtGuard)
@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query(() => [Project])
  allProjects(): Promise<Project[]> {
    return this.projectsService.allProjects()
  }

  @Query(() => [Project])
  myProjects(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectsService.findByUserId(user.id)
  }

  @Mutation(() => Project)
  createProject(
    @Args('project') project: ProjectInput,
    @CurrentUser() user: User
  ): Promise<Project> {
    return this.projectsService.createProjectWithOwner(project, user.id)
  }
}
