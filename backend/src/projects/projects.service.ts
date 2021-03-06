import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Membership } from './membership.entity'
import { ProjectInput } from './project-input.dto'
import { ScrumRole } from './scrum-role.enum'
import { Project } from './project.entity'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>
  ) {}

  allProjects(): Promise<Project[]> {
    return this.projectRepository.find()
  }

  findByUserId(userId: number): Promise<Project[]> {
    // TODO: this waste a join due to dataloader "rejoining" stuff
    // should probably start with Membership
    return this.projectRepository
      .createQueryBuilder('project')
      .innerJoinAndSelect('project.memberships', 'membership')
      .where('membership.user_id = :id', { id: userId })
      .getMany()
  }

  findByProjectId(projectId: number): Promise<Project | null> {
    return this.projectRepository.findOneBy({ id: projectId })
  }

  createProjectWithOwner(
    project: ProjectInput,
    ownerId: number
  ): Promise<Project> {
    const projectToBeCreated = new Project()
    Object.assign(projectToBeCreated, project)

    const membership = new Membership()
    membership.project = projectToBeCreated
    membership.userId = ownerId
    membership.scrumRole = ScrumRole.SCRUM_MASTER

    projectToBeCreated.memberships = [membership]

    return this.projectRepository.save(projectToBeCreated)
  }
}
