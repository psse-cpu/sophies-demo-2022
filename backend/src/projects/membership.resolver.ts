import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { MembershipInput } from './membership-input.dto'
import { Membership } from './membership.entity'
import { MembershipsService } from './memberships.service'

@Resolver(() => Membership)
export class MembershipResolver {
  constructor(private membershipsService: MembershipsService) {}

  @Mutation(() => [Membership])
  async addMember(
    @Args('membershipInput') membershipInput: MembershipInput
  ): Promise<Membership[]> {
    return this.membershipsService.addMember(membershipInput)
  }
}
