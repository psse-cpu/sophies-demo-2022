/* eslint-disable no-restricted-syntax -- not transpiling */

import chalk from 'chalk'
import { seedNormalDatabase } from './seeder'

const [_nodeProcess, _absoluteScriptPath, ...tableNames] = process.argv

async function performSeed() {
  if (tableNames.length === 0) {
    console.log(`${chalk.red('Please supply the name of the tables to seed.')}`)
    console.log(
      `${chalk.yellow.bold(
        'Check that they are snake_cased and singular -- '
      )} ${chalk.blue('example: ')} user, city_mayor`
    )
  } else {
    for (const tableName of tableNames) {
      // eslint-disable-next-line no-await-in-loop -- must be performed in sequence
      await seedNormalDatabase({ tableName })
    }
  }
}
/* eslint-enable no-restricted-syntax -- not transpiling */

performSeed()
