import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { JwtGuard } from 'src/auth/jwt.guard'
import { CurrentUser } from 'src/users/current-user.decorator'
import { User } from 'src/users/user.entity'
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
