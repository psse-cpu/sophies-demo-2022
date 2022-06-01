import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Project } from '../projects/project.entity'
import { User } from '../users/user.entity'
import { Membership } from '../projects/membership.entity'
import { typeOrmInMemoryModules } from '../../test/helpers/typeorm-in-memory-modules'
import { AuthController } from './auth.controller'
import { AuthModule } from './auth.module'

describe('AuthModule', () => {
  it('compiles the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot(),
        ...typeOrmInMemoryModules([User, Project, Membership]),
      ],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(AuthController)).toBeInstanceOf(AuthController)
  })
})
