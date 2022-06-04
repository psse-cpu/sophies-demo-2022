import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'
import {
  TypeormLoaderMiddleware,
  TypeormLoaderExtension,
} from '@webundsoehne/nestjs-graphql-typeorm-dataloader'
import { Membership } from '../projects/membership.entity'
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
  @IsEnum(RegistrationSource)
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
