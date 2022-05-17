import { Field, Int } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  @Field((gqlType) => Int)
  id: number

  @Field()
  @Column()
  title: string

  @Field()
  @Column('text')
  testSuite: string
}
