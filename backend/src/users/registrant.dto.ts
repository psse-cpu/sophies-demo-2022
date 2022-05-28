/* eslint-disable max-classes-per-file -- private classes are for intersection */

import { Field, InputType, IntersectionType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { ProviderRegistrant } from './provider-registrant.dto'

@InputType()
class PlainTextPassword {
  @IsNotEmpty()
  @Field()
  password: string
}

@InputType()
export class Registrant extends IntersectionType(
  ProviderRegistrant,
  PlainTextPassword
) {}

/* eslint-enable max-classes-per-file -- private classes are for intersection */
