import { InputType, OmitType } from '@nestjs/graphql'
import { User } from './user.entity'

@InputType()
export class UserWithoutHash extends OmitType(User, [
  'passwordHash',
] as const) {}
