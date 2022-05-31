import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { Project } from 'src/projects/project.entity'
import { User } from 'src/users/user.entity'
import { typeOrmInMemoryModules } from '../../test/helpers/typeorm-in-memory-modules'
import { AuthController } from './auth.controller'
import { AuthModule } from './auth.module'

describe('AuthModule', () => {
  it('compiles the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot(),
        ...typeOrmInMemoryModules([User, Project]),
      ],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(AuthController)).toBeInstanceOf(AuthController)
  })
})
