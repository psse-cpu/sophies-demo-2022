import { Test } from '@nestjs/testing'
import { Exercise } from './exercise.entity'
import { ExerciseResolver } from './exercise.resolver'
import { ExercisesService } from './exercises.service'

const mockExercise: Exercise = {
  id: 1,
  authorId: 3,
  title: 'FizzBuzz',
  testSuite: 'dummy',
}

const mockExercisesService = {
  allExercises: jest.fn().mockResolvedValue([mockExercise]),
}

describe('UserResolver', () => {
  let resolver: ExerciseResolver

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ExerciseResolver,
        {
          provide: ExercisesService,
          useValue: mockExercisesService,
        },
      ],
    }).compile()

    resolver = module.get(ExerciseResolver)
  })

  describe('#allExercises()', () => {
    it('returns all exercises', () => {
      return expect(resolver.allExercises()).resolves.toStrictEqual([
        { id: 1, authorId: 3, title: 'FizzBuzz', testSuite: 'dummy' },
      ])
    })
  })
})
