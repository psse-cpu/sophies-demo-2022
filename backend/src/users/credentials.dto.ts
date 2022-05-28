import { InputType, PickType } from '@nestjs/graphql'
import { Registrant } from './registrant.dto'

@InputType()
export class Credentials extends PickType(Registrant, [
  'email',
  'password',
] as const) {}
