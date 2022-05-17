import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserResolver } from './user.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
