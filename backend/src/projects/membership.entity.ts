import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import {
  TypeormLoaderExtension,
  TypeormLoaderMiddleware,
} from '@webundsoehne/nestjs-graphql-typeorm-dataloader'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../users/user.entity'
import { ProjectRole } from './project-role.enum'
import { Project } from './project.entity'

@Entity()
@ObjectType()
@InputType('MembershipInput')
export class Membership {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column('int')
  @Field(() => Int)
  projectId: number

  @Column('int')
  @Field(() => Int)
  userId: number

  @Column({
    type: 'simple-enum',
    enum: ProjectRole,
    default: ProjectRole.MEMBER,
  })
  @Field(() => ProjectRole)
  projectRole: ProjectRole

  @ManyToOne(() => User, (user) => user.memberships)
  @Field(() => User, { middleware: [TypeormLoaderMiddleware] })
  @TypeormLoaderExtension((membership: Membership) => membership.userId)
  user?: User

  @ManyToOne(() => Project, (project) => project.memberships)
  @Field(() => Project, { middleware: [TypeormLoaderMiddleware] })
  @TypeormLoaderExtension((membership: Membership) => membership.projectId)
  project?: Project

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
