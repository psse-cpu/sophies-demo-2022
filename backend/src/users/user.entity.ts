import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Exercise } from '../exercises/exercise.entity'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((gqlType) => Int)
  id: number

  @Column({ unique: true })
  @Field()
  email: string

  @Column('text')
  passwordHash: string

  @OneToMany(() => Exercise, (exercise) => exercise.author)
  exercises: Exercise[]
}

export type UserWithoutHash = Omit<User, 'passwordHash'>
