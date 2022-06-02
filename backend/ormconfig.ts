import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import 'dotenv/config'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

// eslint-disable-next-line import/no-default-export -- it's a config file!
export default {
  type: 'postgres',
  migrationsRun: false, // of course!
  url:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
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
