import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcrypt'
import omit from 'lodash/fp/omit'
import crypto from 'node:crypto'
import { ProviderRegistrant } from 'src/users/provider-registrant.dto'
import { UserWithoutHash } from 'src/users/user-without-hash.dto'
import { UserIdentification } from '../users/user-identification.dto'
import { UsersService } from '../users/users.service'

interface Tokens {
  accessToken: string
  // TODO: implement refresh tokens
  // labels: security
}

export interface JwtPayload {
  sub: number
  email: string
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async authenticate(
    email: string,
    password: string
  ): Promise<UserWithoutHash | undefined> {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      return undefined
    }

    const hashesMatch = await bcrypt.compare(password, user.passwordHash)
    return hashesMatch ? omit('passwordHash', user) : undefined
  }

  async handleProviderLogin(
    registrant: ProviderRegistrant
  ): Promise<UserWithoutHash> {
    if (!registrant.email) {
      throw new Error(
        `No email found with ${registrant.registrationSource} login.`
      )
    }

    const existingUser = await this.usersService.findByEmail(registrant.email)

    if (!existingUser) {
      return this.usersService
        .register({
          ...registrant,
          password: crypto.randomUUID(),
        })
        .then(omit('passwordHash'))
    }

    // TODO: delegate omission of hash to usersService
    return omit('passwordHash', existingUser)
  }

  async signJwt({ id, email }: UserIdentification): Promise<Tokens> {
    const payload: JwtPayload = { email, sub: id }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
