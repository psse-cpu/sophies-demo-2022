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
import { AppController } from './app.controller'
import { ProjectsModule } from './projects/projects.module'

import ormConfig from '../ormconfig'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(omit(ormConfig, 'cli', 'migrations')),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), '../frontend/schema.graphql'),
      debug: process.env.NODE_ENV !== 'production',
      playground: true, // TODO: revert later to ➡ process.env.NODE_ENV !== 'production',
      cors: {
        origin: process.env.FRONTEND_ORIGIN,
        credentials: true,
      },
    }),
    AuthModule,
    UsersModule,
    ProjectsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: (): DataLoaderInterceptor =>
        new DataLoaderInterceptor({ typeormGetConnection: getConnection }),
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
