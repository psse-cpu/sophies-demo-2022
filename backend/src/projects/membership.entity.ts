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
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsEnum, IsInt } from 'class-validator'
import { User } from '../users/user.entity'
import { ScrumRole } from './scrum-role.enum'
import { Project } from './project.entity'

@Entity()
@ObjectType()
@Index(['projectId', 'userId'], { unique: true })
export class Membership {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Column('int')
  @Field(() => Int)
  @IsInt()
  projectId: number

  @Column('int')
  @Field(() => Int)
  @IsInt()
  userId: number

  @Column({
    type: 'simple-enum',
    enum: ScrumRole,
    default: ScrumRole.MEMBER,
  })
  @Field(() => ScrumRole)
  @IsEnum(ScrumRole)
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
