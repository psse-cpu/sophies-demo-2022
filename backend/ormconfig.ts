import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import 'dotenv/config'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'

const common = {
  namingStrategy: new SnakeNamingStrategy(),

  // eslint-disable-next-line unicorn/prefer-module -- project uses CommonJS
  entities: [`${__dirname}/src/**/*.entity.{ts,js}`],
  logging: ['error', 'schema', 'query', 'warn'],
}

// eslint-disable-next-line import/no-default-export -- it's a config file!
export default process.env.STAGING
  ? ({
      type: 'better-sqlite3',
      database: './sophies.sqlite3',
      migrations: ['database/migrations-staging/*'],
      cli: {
        migrationsDir: 'database/migrations-staging',
      },
      ...common,
    } as BetterSqlite3ConnectionOptions)
  : ({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrations: ['database/migrations/*'],
      cli: {
        migrationsDir: 'database/migrations',
      },
      ...common,
    } as PostgresConnectionOptions)
