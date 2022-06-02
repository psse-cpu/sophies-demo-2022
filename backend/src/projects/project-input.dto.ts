import { InputType, PickType } from '@nestjs/graphql'
import { Project } from './project.entity'

@InputType()
export class ProjectInput extends PickType(
  Project,
  ['name', 'description', 'sprintLength'],
  InputType
) {}
