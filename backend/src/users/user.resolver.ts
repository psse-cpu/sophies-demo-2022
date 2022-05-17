import { Query, Resolver } from '@nestjs/graphql'
import { User, PlainUser } from './user.entity'
import { UsersService } from './users.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<PlainUser[]> {
    return this.usersService.allUsers()
  }
}
