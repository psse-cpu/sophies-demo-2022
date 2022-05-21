import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}

export type UserWithoutHash = Omit<User, 'passwordHash'>
