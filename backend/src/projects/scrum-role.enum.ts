import { registerEnumType } from '@nestjs/graphql'

export enum ScrumRole {
  PRODUCT_OWNER = 'product owner',
  SCRUM_MASTER = 'Scrum Master',
  MEMBER = 'member',
}

registerEnumType(ScrumRole, { name: 'ScrumRole' })
