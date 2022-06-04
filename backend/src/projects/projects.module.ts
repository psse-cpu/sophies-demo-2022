import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Membership } from './membership.entity'
import { MembershipResolver } from './membership.resolver'
import { MembershipsService } from './memberships.service'
import { Project } from './project.entity'
import { ProjectResolver } from './project.resolver'
import { ProjectsService } from './projects.service'

@Module({
  imports: [TypeOrmModule.forFeature([Project, Membership])],
  providers: [
    ProjectResolver,
    ProjectsService,
    MembershipResolver,
    MembershipsService,
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
