import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import 'dotenv/config'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

// eslint-disable-next-line import/no-default-export
export default {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  migrations: ['database/migrations/*'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: 'migrations',
  },
} as PostgresConnectionOptions
