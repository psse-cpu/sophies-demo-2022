import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { JwtGuard } from '../auth/jwt.guard'
import { User, UserWithoutHash } from './user.entity'
import { UsersService } from './users.service'

@UseGuards(JwtGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  async users(): Promise<UserWithoutHash[]> {
    return this.usersService.allUsers()
  }
}
