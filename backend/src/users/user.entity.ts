import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  TypeormLoaderExtension,
  TypeormLoaderMiddleware,
} from '@webundsoehne/nestjs-graphql-typeorm-dataloader'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Exercise } from '../exercises/exercise.entity'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column({ unique: true })
  @Field()
  email: string

  @Column('text')
  passwordHash: string

  @OneToMany(() => Exercise, (exercise) => exercise.author)
  @Field(() => [Exercise], { middleware: [TypeormLoaderMiddleware] })
  @TypeormLoaderExtension((exercise: Exercise) => exercise.authorId, {
    selfKey: true,
  })
  exercises?: Exercise[]
}

export type UserWithoutHash = Omit<User, 'passwordHash'>
