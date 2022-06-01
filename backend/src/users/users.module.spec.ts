import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { User } from '../users/user.entity'
import { Project } from '../projects/project.entity'
import { Membership } from '../projects/membership.entity'
import { typeOrmInMemoryModules } from '../../test/helpers/typeorm-in-memory-modules'
import { UsersModule } from './users.module'
import { UserResolver } from './user.resolver'

describe('UserModule', () => {
  it('compiles the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot(),
        ...typeOrmInMemoryModules([User, Project, Membership]),
      ],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(UserResolver)).toBeInstanceOf(UserResolver)
  })
})
