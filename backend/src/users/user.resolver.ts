import { Query, Resolver } from '@nestjs/graphql'
import { User, UserWithoutHash } from './user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<UserWithoutHash[]> {
    return this.usersService.allUsers()
  }
}
