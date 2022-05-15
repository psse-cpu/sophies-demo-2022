import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

type Constructor = new (...args: unknown[]) => unknown

export const typeOrmInMemoryModules = (
  entities: Constructor[]
): DynamicModule[] => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    entities,
    dropSchema: true,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities),
]
