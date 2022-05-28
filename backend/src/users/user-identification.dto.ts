import { InputType, PickType } from '@nestjs/graphql'
import { User } from './user.entity'

@InputType()
export class UserIdentification extends PickType(User, [
  'id',
  'email',
] as const) {}
