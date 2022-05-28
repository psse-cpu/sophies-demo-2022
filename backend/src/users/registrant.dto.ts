/* eslint-disable max-classes-per-file -- private classes are for intersection */

import { IntersectionType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { ProviderRegistrant } from './provider-registrant.dto'

class PlainTextPassword {
  @IsNotEmpty()
  password: string
}

export class Registrant extends IntersectionType(
  ProviderRegistrant,
  PlainTextPassword
) {}

/* eslint-enable max-classes-per-file -- private classes are for intersection */