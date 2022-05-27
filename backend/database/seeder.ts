/* eslint-disable unicorn/prefer-module -- seeder is ran in CJS */

import {
  Connection,
  getConnection,
  getConnectionManager,
  ObjectType,
  Repository,
} from 'typeorm'
import chalk from 'chalk'
import { tableize } from 'inflection'
import _ from 'lodash'
import { User } from '../src/users/user.entity'
import { UsersService } from '../src/users/users.service'
import ormConfig from '../ormconfig'

interface TestDatabaseSeedOptions<T> {
  entityClass: ObjectType<T>
  data: T[]
}

interface RegularDatabaseSeedOptions {
  seedName: string
  onlyWhenEmpty?: boolean
  clearOldData?: boolean
  useFaker?: unknown // TODO: implement this
}

const connect = async (): Promise<Connection> => {
  const manager = getConnectionManager()
  const connection = manager.has('default')
    ? getConnection()
    : manager.create(ormConfig)

  if (!connection.isConnected) {
    await connection.connect()
  }

  return connection
}

const seedDatabase = async <T>(
  seedName: string,
  entityClass: ObjectType<T>,
  data: T[]
): Promise<boolean> => {
  const connection = await connect()
  const repository = connection.getRepository(entityClass)

  if (entityClass === User) {
    // special treatment due to bcrypt
    const service = new UsersService(repository as unknown as Repository<User>)

    // TODO: remove any and fix this later
    // labels: tech-debt
    const promises = data.map((user: any) => {
      const { username, password, ...others } = user
      return service.register(username, password, others)
    })

    await Promise.all(promises)
  } else {
    await repository.insert(data)
  }

  console.log(`${chalk.green.bold('Seeding complete: ')}: ${seedName}`)
  return true
}

export const seedNormalDatabase = async <T>({
  seedName,
  onlyWhenEmpty = true,
  clearOldData = false,
}: RegularDatabaseSeedOptions): Promise<boolean> => {
  // eslint-disable-next-line global-require, import/no-dynamic-require -- need to be dynamic
  const { sampleData, entityClass } = require(`./seeds/${seedName}.seed.ts`)
  const connection = await connect()

  if (typeof entityClass !== 'function') {
    console.log(`${chalk.red('The entity must be a class constructor.')}`)
    return false
  }

  const repository = connection.getRepository(entityClass)
  const { tableName } = connection.getMetadata(entityClass)

  if (onlyWhenEmpty) {
    const count = await connection.getRepository(entityClass).count()

    if (count > 0) {
      console.log(`${chalk.red.bold('Table not empty: ')}: ${tableName}`)
      return false
    }
  } else if (clearOldData) {
    await repository.clear()
    console.log(`${chalk.yellow.bold('Table truncated: ')}: ${tableName}`)
  }

  if (!Array.isArray(sampleData)) {
    const message = `${chalk.red.bold(
      'Seed data not an array: '
    )}: ${seedName}.seed.ts`

    console.log(message)
    return false
  }

  return seedDatabase(seedName, entityClass, sampleData)
}

export const seedTestDatabase = async <T>({
  entityClass,
  data,
}: TestDatabaseSeedOptions<T>): Promise<boolean> =>
  seedDatabase(`cypress-${tableize(entityClass.name)}`, entityClass, data)

/* eslint-enable unicorn/prefer-module -- seeder */
