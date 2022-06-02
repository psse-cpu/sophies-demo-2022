import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import {
  TypeormLoaderExtension,
  TypeormLoaderMiddleware,
} from '@webundsoehne/nestjs-graphql-typeorm-dataloader'
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Membership } from './membership.entity'

@Entity()
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  @IsNotEmpty()
  name: string

  @Column('text')
  @Field()
  @IsNotEmpty()
  description: string

  @Column('int')
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(4)
  sprintLength: number

  @OneToMany(() => Membership, (membership) => membership.project, {
    cascade: true,
  })
  @Field(() => [Membership], { middleware: [TypeormLoaderMiddleware] })
  @TypeormLoaderExtension((membership: Membership) => membership.projectId, {
    selfKey: true,
  })
  memberships?: Membership[]

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date

  @DeleteDateColumn()
  @Field()
  deletedAt?: Date
}
