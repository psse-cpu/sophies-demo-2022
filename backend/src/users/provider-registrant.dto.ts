import { InputType, OmitType } from '@nestjs/graphql'
import { UserWithoutHash } from './user-without-hash.dto'

@InputType()
export class ProviderRegistrant extends OmitType(UserWithoutHash, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {}
