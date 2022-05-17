// TODO: refactor to avoid duplication
// labels: tech-debt

import { createConnection } from 'typeorm'

import chalk from 'chalk'
import { User } from '../../src/users/user.entity'
import { Exercise } from '../../src/exercises/exercise.entity'
import ormConfig from '../../ormconfig'
import 'dotenv/config'

async function seed(): Promise<void> {
  const connection = await createConnection(ormConfig)
  const exerciseRepository = connection.getRepository(Exercise)
  const userRepository = connection.getRepository(User)

  const mike = await userRepository.findOne({ email: 'mike@cpu.edu.ph' })
  const fifi = await userRepository.findOne({ email: 'fifi@cpu.edu.ph' })

  await Promise.all([
    exerciseRepository.save({
      title: 'Factorial',
      testSuite: 'dummy tests grr',
      author: mike,
    }),
    exerciseRepository.save({
      title: 'FizzBuzz',
      testSuite: 'dummy tests foo',
      author: mike,
    }),
    exerciseRepository.save({
      title: 'Halo-halo',
      testSuite: 'dummy tests bar',
      author: fifi,
    }),
    exerciseRepository.save({
      title: "Steve Kerr's island",
      testSuite: 'dummy tests buzz',
      author: fifi,
    }),
    exerciseRepository.save({
      title: 'SE Rocks!',
      testSuite: 'dummy tests nye',
      author: fifi,
    }),
  ])

  console.log(`${chalk.green.bold('Seeding complete: ')}: exercises`)
}

seed()
