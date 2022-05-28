import { PickType } from '@nestjs/graphql'
import { Registrant } from './registrant.dto'

export class Credentials extends PickType(Registrant, [
  'email',
  'password',
] as const) {}
