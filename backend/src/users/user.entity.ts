import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { RegistrationSource } from './registration-source'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @Column({ unique: true })
  @Field()
  email: string

  @Column('text')
  passwordHash: string

  @Column()
  @Field()
  familyName: string

  @Column()
  @Field()
  givenName: string

  @Column({
    type: 'simple-enum',
    enum: RegistrationSource,
  })
  @Field()
  registrationSource: RegistrationSource

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date
}

export type UserWithoutHash = Omit<User, 'passwordHash'>

export type Registrant = Omit<
  UserWithoutHash,
  'id' | 'createdAt' | 'updatedAt'
> & {
  password: string
}

export type ProviderRegistrant = Omit<Registrant, 'password'>

export type Credentials = { email: string; password: string }

export type UserIdentifiers = { id: number; email: string }
