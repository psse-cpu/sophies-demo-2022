import { Info, Query, Resolver } from '@nestjs/graphql'
import { GraphQLResolveInfo } from 'graphql'
import {
  parseResolveInfo,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info'

import { Project } from './project.entity'
import { ProjectsService } from './projects.service'

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private projectsService: ProjectsService) {}

  @Query(() => [Project])
  allProjects(@Info() info: GraphQLResolveInfo): Promise<Project[]> {
    const relations: 'members'[] = []
    const parsedInfo = parseResolveInfo(info) as ResolveTree
    const simplifiedInfo = simplifyParsedResolveInfoFragmentWithType(
      parsedInfo,
      info.returnType
    )

    if ('members' in simplifiedInfo.fields) {
      relations.push('members')
    }

    return this.projectsService.allProjects({ relations })
  }
}
