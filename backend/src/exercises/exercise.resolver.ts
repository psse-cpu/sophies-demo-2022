import { Query, Resolver } from '@nestjs/graphql'
import { Exercise } from './exercise.entity'
import { ExercisesService } from './exercises.service'

@Resolver(() => Exercise)
export class ExerciseResolver {
  constructor(private exercisesService: ExercisesService) {}

  @Query((returns) => [Exercise])
  allExercises(): Promise<Exercise[]> {
    return this.exercisesService.allExercises()
  }
}
