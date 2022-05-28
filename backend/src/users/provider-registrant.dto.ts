import { OmitType } from '@nestjs/graphql'
import { UserWithoutHash } from './user-without-hash.dto'

export class ProviderRegistrant extends OmitType(UserWithoutHash, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
