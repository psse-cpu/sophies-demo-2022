import { Field, Int } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  @Field((gqlType) => Int)
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

  @ManyToOne(() => User, (user) => user.exercises)
  author: User
}
