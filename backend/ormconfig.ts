import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import dotenv from 'dotenv'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { join } from 'node:path'

dotenv.config({
  path: join(
    __dirname, // eslint-disable-line unicorn/prefer-module -- it's a config file
    process.env.NODE_ENV === 'test' ? '.env.test.local' : '.env'
  ),
  override: process.env.NODE_ENV === 'test', // necessary due to migration losing env vars
})

// eslint-disable-next-line import/no-default-export -- it's a config file!
export default {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: ['database/migrations/*'],
  cli: {
    migrationsDir: 'database/migrations',
  },
  keepConnectionAlive: true,
  namingStrategy: new SnakeNamingStrategy(),

  // eslint-disable-next-line unicorn/prefer-module -- project uses CommonJS
  entities: [`${__dirname}/src/**/*.entity.{ts,js}`],
  logging: ['error', 'schema', 'query', 'warn'],
} as PostgresConnectionOptions
