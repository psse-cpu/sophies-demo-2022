import {
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { IsEmail, IsNotEmpty } from 'class-validator'
import {
  TypeormLoaderMiddleware,
  TypeormLoaderExtension,
} from '@webundsoehne/nestjs-graphql-typeorm-dataloader'
import { Membership } from '../projects/membership.entity'
import { RegistrationSource } from './registration-source'

@Entity()
@ObjectType()
@InputType('UserInput')
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

  @OneToMany(() => Membership, (membership) => membership.user, {
    cascade: true,
  })
  @Field(() => [Membership], { middleware: [TypeormLoaderMiddleware] })
  @TypeormLoaderExtension((membership: Membership) => membership.userId, {
    selfKey: true,
  })
  memberships?: Membership[]

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

registerEnumType(RegistrationSource, { name: 'RegistrationSource' })
