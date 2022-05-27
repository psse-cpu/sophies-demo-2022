/* eslint-disable no-restricted-syntax -- not transpiling */

import chalk from 'chalk'
import { seedNormalDatabase } from './seeder'

const [_nodeProcess, _absoluteScriptPath, ...seedNames] = process.argv

async function performSeed() {
  if (seedNames.length === 0) {
    console.log(
      `${chalk.red(
        'Please supply the name of the seed file(s) without extensions.'
      )}`
    )
    console.log(`${chalk.yellow.bold('Example: ')} users, cities, houses`)
  } else {
    for (const seedName of seedNames) {
      // eslint-disable-next-line no-await-in-loop -- must be performed in sequence
      await seedNormalDatabase({ seedName })
    }
  }
}
/* eslint-enable no-restricted-syntax -- not transpiling */

performSeed()
