import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  TypeormLoaderExtension,
  TypeormLoaderMiddleware,
} from '@webundsoehne/nestjs-graphql-typeorm-dataloader'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../users/user.entity'

@ObjectType()
@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column('text')
  testSuite: string

  @Field()
  @Column('integer')
  authorId: number

  @Field(() => User, { middleware: [TypeormLoaderMiddleware] })
  @ManyToOne(() => User, (user) => user.exercises)
  @TypeormLoaderExtension((exercise: Exercise) => exercise.authorId)
  author?: User
}
