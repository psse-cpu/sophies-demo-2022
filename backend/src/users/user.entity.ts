import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { Project } from '../projects/project.entity'
import { RegistrationSource } from './registration-source'

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string

  @Column('text')
  passwordHash: string

  @Column()
  @Field()
  @IsNotEmpty()
  familyName: string

  @Column()
  @Field()
  @IsNotEmpty()
  givenName: string

  @Column({
    type: 'simple-enum',
    enum: RegistrationSource,
  })
  @Field(() => RegistrationSource)
  registrationSource: RegistrationSource

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @UpdateDateColumn()
  @Field()
  updatedAt: Date

  @DeleteDateColumn()
  @Field()
  deletedAt?: Date

  @ManyToMany(() => Project, (project) => project.members)
  @Field(() => [Project])
  @JoinTable({
    name: 'membership',
  })
  projects: Project[]
}

registerEnumType(RegistrationSource, { name: 'RegistrationSource' })
