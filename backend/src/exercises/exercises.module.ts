import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Exercise } from './exercise.entity'
import { ExerciseResolver } from './exercise.resolver'
import { ExercisesService } from './exercises.service'

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesService, ExerciseResolver],
  exports: [ExercisesService],
})
export class ExercisesModule {}
