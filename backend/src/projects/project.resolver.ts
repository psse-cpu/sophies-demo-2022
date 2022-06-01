import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../users/current-user.decorator'
import { User } from '../users/user.entity'
import { JwtGuard } from '../auth/jwt.guard'
import { Project } from './project.entity'
import { ProjectsService } from './projects.service'

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
}
