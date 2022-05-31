import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './project.entity'
import { ProjectResolver } from './project.resolver'
import { ProjectsService } from './projects.service'

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectResolver, ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
