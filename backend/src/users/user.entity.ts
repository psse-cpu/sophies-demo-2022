import { Field, Int, ObjectType } from '@nestjs/graphql'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
import { IsEmail, IsNotEmpty } from 'class-validator'
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
  @Field()
  registrationSource: RegistrationSource

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt?: Date
}

console.log('linti gid', (User as any).properties)
