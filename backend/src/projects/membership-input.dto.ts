import { InputType, PickType } from '@nestjs/graphql'
import { Membership } from './membership.entity'

@InputType()
export class MembershipInput extends PickType(
  Membership,
  ['userId', 'projectId', 'scrumRole'] as const,
  InputType
) {}
