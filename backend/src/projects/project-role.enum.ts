import { registerEnumType } from '@nestjs/graphql'

export enum ProjectRole {
  OWNER = 'owner',
  MAINTAINER = 'maintainer',
  MEMBER = 'member',
  REPORTER = 'reporter',
}

registerEnumType(ProjectRole, { name: 'ProjectRole' })
