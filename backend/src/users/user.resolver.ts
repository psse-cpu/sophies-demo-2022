import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JwtGuard } from '../auth/jwt.guard'
import { User } from './user.entity'
import { UserWithoutHash } from './user-without-hash.dto'
import { UsersService } from './users.service'
import { Registrant } from './registrant.dto'
import { RegistrationSource } from './registration-source'

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Mutation((returns) => User)
  async register(@Args() registrant: Registrant): Promise<UserWithoutHash> {
    return this.usersService.register({
      ...registrant,
      // TODO: this needs redesign, since it overrides whatever the user gives
      registrationSource: RegistrationSource.LOCAL, // only legal value here
    })
  }

  @UseGuards(JwtGuard)
  @Query((returns) => [User])
  async users(): Promise<UserWithoutHash[]> {
    return this.usersService.allUsers()
  }
}
