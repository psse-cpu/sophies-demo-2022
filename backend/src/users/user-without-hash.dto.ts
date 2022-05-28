import { OmitType } from '@nestjs/graphql'
import { User } from './user.entity'

export class UserWithoutHash extends OmitType(User, [
  'passwordHash',
] as const) {}
