import { getConnection, getConnectionManager } from 'typeorm'
import { User } from '../src/users/user.entity'
import { UsersService } from '../src/users/users.service'
import ormConfig from '../ormconfig'

// TODO: reuse this for seeding outside of Cypress
export const seeder = async (
  table: string,
  data: unknown[]
): Promise<boolean> => {
  switch (table.toLowerCase()) {
    case 'user': {
      const manager = getConnectionManager()
      const connection = manager.has('default')
        ? getConnection()
        : manager.create(ormConfig)

      if (!connection.isConnected) {
        await connection.connect()
      }

      const userRepository = connection.getRepository(User)

      // need service, and not just a repo coz of bcrypt
      const service = new UsersService(userRepository)
      await userRepository.clear()

      const promises = data.map((user: { email: string; password: string }) =>
        service.register(user.email, user.password)
      )

      await Promise.all(promises)

      // I dunno why this does not work (maybe that's why it's deprecated)
      // await connection.close() // most likely race condition bet. Typeorm & Cypress

      return true
    }
    default:
      return false
  }
}
