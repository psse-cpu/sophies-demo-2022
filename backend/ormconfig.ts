import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import 'dotenv/config'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

// eslint-disable-next-line import/no-default-export -- it's a config file!
export default {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: ['database/migrations/*'],
  cli: {
    migrationsDir: 'database/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),

  // eslint-disable-next-line unicorn/prefer-module -- project uses CommonJS
  entities: [`${__dirname}/src/**/*.entity.{ts,js}`],
  logging: ['error', 'schema', 'query', 'warn'],
} as PostgresConnectionOptions
