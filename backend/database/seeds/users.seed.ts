import { createConnection } from 'typeorm'

import chalk from 'chalk'
import { User } from '../../src/users/user.entity'
import { UsersService } from '../../src/users/users.service'
import ormConfig from '../../ormconfig'

import 'dotenv/config'

async function seed(): Promise<void> {
  const connection = await createConnection(ormConfig)
  const userRepository = connection.getRepository(User)

  // need service, and not just a repo coz of bcrypt
  const service = new UsersService(userRepository)
  const users = await service.allUsers()

  if (users.length === 0) {
    await Promise.all([
      service.register('mike@cpu.edu.ph', 'lol'),
      service.register('richard@cpu.edu.ph', 'rich'),
      service.register('fifi@cpu.edu.ph', 'fifi'),
    ])

    console.log(`${chalk.green.bold('Seeding complete: ')}: users`)
  } else {
    console.log(`${chalk.red.bold('Table not empty: ')}: users`)
  }
}

seed()
