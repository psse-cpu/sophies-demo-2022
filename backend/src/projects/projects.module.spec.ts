import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { User } from '../users/user.entity'
import { Project } from '../projects/project.entity'
import { Membership } from '../projects/membership.entity'
import { typeOrmInMemoryModules } from '../../test/helpers/typeorm-in-memory-modules'
import { ProjectsModule } from './projects.module'
import { ProjectResolver } from './project.resolver'

describe('ProjectsModule', () => {
  it('compiles the module', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ProjectsModule,
        ConfigModule.forRoot(),
        ...typeOrmInMemoryModules([User, Project, Membership]),
      ],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(ProjectResolver)).toBeInstanceOf(ProjectResolver)
  })
})
