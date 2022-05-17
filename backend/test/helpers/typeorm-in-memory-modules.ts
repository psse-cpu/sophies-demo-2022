import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

type Constructor = new (...arguments_: unknown[]) => unknown

export const typeOrmInMemoryModules = (
  entities: Constructor[]
): DynamicModule[] => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    autoLoadEntities: true,
    dropSchema: true,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities),
]
