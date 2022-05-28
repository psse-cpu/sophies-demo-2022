/* eslint-disable unicorn/prefer-module -- seeder is ran in CJS */
/* eslint-disable no-console -- it's a CLI script */

import {
  Connection,
  getConnection,
  getConnectionManager,
  Repository,
} from 'typeorm'
import chalk from 'chalk'
import _ from 'lodash'
import { Registrant, User } from '../src/users/user.entity'
import { UsersService } from '../src/users/users.service'
import ormConfig from '../ormconfig'

interface DatabaseSeedOptions<T> {
  tableName: string
  data: T[]
  onlyWhenEmpty?: boolean
  clearOldData?: boolean
}

// Regular here means not seeding from Cypress
interface RegularDatabaseSeedOptions {
  tableName: string
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

// entity class reference does not work with Cypress
const seedDatabase = async <T>({
  tableName,
  data,
  onlyWhenEmpty,
  clearOldData,
}: DatabaseSeedOptions<T>): Promise<boolean> => {
  const connection = await connect()
  const repository = connection.getRepository(tableName)

  if (onlyWhenEmpty) {
    const count = await connection.getRepository(tableName).count()

    if (count > 0) {
      console.log(`${chalk.red.bold('Table not empty: ')}: ${tableName}`)
      return false
    }
  } else if (clearOldData) {
    await repository.clear()
    console.log(`${chalk.yellow.bold('Table truncated: ')}: ${tableName}`)
  }

  if (tableName === 'user') {
    // special treatment due to bcrypt
    const service = new UsersService(repository as unknown as Repository<User>)

    const promises = (data as unknown[] as Registrant[]).map((user) =>
      service.register(user)
    )

    await Promise.all(promises)
  } else {
    await repository.insert(data)
  }

  console.log(`${chalk.green.bold('Seeding complete: ')}: ${tableName}`)
  return true
}

export const seedNormalDatabase = async ({
  tableName,
}: RegularDatabaseSeedOptions): Promise<boolean> => {
  const {
    sampleData,
    _customFunction,
    // eslint-disable-next-line global-require, import/no-dynamic-require -- need to be dynamic
  } = require(`./seeds/${tableName}.seed.ts`)
  // TODO: 👆 custom function may handle special cases like User

  if (!Array.isArray(sampleData)) {
    const message = `${chalk.red.bold(
      'Seed data not an array: '
    )}: ${tableName}.seed.ts`

    console.log(message)
    return false
  }

  return seedDatabase({ tableName, data: sampleData })
}

export const seedTestDatabase = <T>({
  tableName,
  data,
}: DatabaseSeedOptions<T>): Promise<boolean> =>
  seedDatabase({ tableName, data, onlyWhenEmpty: false, clearOldData: true })

/* eslint-enable unicorn/prefer-module -- seeder */
/* eslint-enable no-console -- it's a CLI script */
