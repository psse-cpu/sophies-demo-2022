import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column('text')
  @Field()
  description: string

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @UpdateDateColumn()
  @Field()
  updatedAt: Date

  @DeleteDateColumn()
  @Field()
  deletedAt?: Date
}
