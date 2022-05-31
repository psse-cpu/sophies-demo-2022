import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from './project.entity'

interface AllProjectOptions {
  relations: 'members'[] // add unions here
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>
  ) {}

  allProjects({ relations }: AllProjectOptions): Promise<Project[]> {
    return this.projectRepository.find({ relations })
  }
}
