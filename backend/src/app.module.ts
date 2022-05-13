import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import omit from 'lodash/omit'

import { AppController } from './app.controller'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

import ormConfig from '../ormconfig'

@Module({
  imports: [
    TypeOrmModule.forRoot(
      process.env.NODE_ENV === 'test'
        ? {
            type: 'better-sqlite3',
            database: ':memory:',
            autoLoadEntities: true,
            dropSchema: true,
            synchronize: true,
          }
        : omit(ormConfig, 'cli')
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
