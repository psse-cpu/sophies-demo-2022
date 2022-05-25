import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import omit from 'lodash/omit'
import { DataLoaderInterceptor } from '@webundsoehne/nestjs-graphql-typeorm-dataloader'

import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import path from 'node:path'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { getConnection } from 'typeorm'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

import ormConfig from '../ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test.local' : '.env',
    }),
    TypeOrmModule.forRoot(omit(ormConfig, 'cli', 'migrations')),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      /* eslint-disable-next-line unicorn/prefer-module -- transpiled using CommonJS no worries */
      autoSchemaFile: path.join(__dirname, '../../../frontend/schema.graphql'),
      debug: process.env.NODE_ENV !== 'production',
      playground: true, // TODO: revert later to ➡ process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: (): DataLoaderInterceptor =>
        new DataLoaderInterceptor({ typeormGetConnection: getConnection }),
    },
  ],
})
export class AppModule {}
