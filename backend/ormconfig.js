const { SnakeNamingStrategy } = require('typeorm-naming-strategies')

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sophies_demo',
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: ['migrations/*'],
  namingStrategy: new SnakeNamingStrategy(),
  cli: {
    migrationsDir: 'migrations',
  },
}
