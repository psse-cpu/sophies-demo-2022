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
  name: string

  @Column('text')
  @Field()
  description: string

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
  @Field()
  updatedAt: Date

  @DeleteDateColumn()
  @Field()
  deletedAt?: Date
}
