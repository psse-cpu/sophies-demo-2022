import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import omit from 'lodash/omit'

import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

import ormConfig from '../ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(omit(ormConfig, 'cli', 'migrations')),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
