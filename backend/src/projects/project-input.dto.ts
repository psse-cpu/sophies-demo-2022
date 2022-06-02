import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

// TODO: extract using mapped types (which is not working right now)
// WORKAROUND for https://github.com/nestjs/graphql/issues/2216
// error is Input Object type ProjectInput must define one or more fields.
@InputType()
export class ProjectInput {
  @Field()
  @IsNotEmpty()
  name?: string

  @Field()
  @IsNotEmpty()
  description?: string
}
