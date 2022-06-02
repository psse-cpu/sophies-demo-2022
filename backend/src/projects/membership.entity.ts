import { Field, Int, ObjectType } from '@nestjs/graphql'
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
import { ScrumRole } from './scrum-role.enum'
import { Project } from './project.entity'

@Entity()
@ObjectType()
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
    enum: ScrumRole,
    default: ScrumRole.MEMBER,
  })
  @Field(() => ScrumRole)
  scrumRole: ScrumRole

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
