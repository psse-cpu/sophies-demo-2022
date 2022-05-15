import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import omit from 'lodash/omit'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

import ormConfig from '../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(omit(ormConfig, 'cli')),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
