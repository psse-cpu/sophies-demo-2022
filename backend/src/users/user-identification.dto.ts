import { PickType } from '@nestjs/graphql'
import { User } from './user.entity'

export class UserIdentification extends PickType(User, [
  'id',
  'email',
] as const) {}
