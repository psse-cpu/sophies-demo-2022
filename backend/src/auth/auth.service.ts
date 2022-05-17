import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import omit from 'lodash/omit'
import crypto from 'node:crypto'

import { JwtService } from '@nestjs/jwt'
import { User, PlainUser } from '../users/user.entity'
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
  ): Promise<Omit<User, 'passwordHash'> | undefined> {
    const user = await this.usersService.findByEmail(email)

    if (!user) {
      return undefined
    }

    const hashesMatch = await bcrypt.compare(password, user.passwordHash)
    return hashesMatch ? omit(user, 'passwordHash') : undefined
  }

  async handleProviderLogin(
    email: string,
    provider: 'google-oauth' | 'facebook'
  ): Promise<PlainUser> {
    if (!email) {
      throw new Error(`No email found with ${provider} login.`)
    }

    let user = await this.usersService.findByEmail(email)

    if (!user) {
      user = await this.usersService.register(email, crypto.randomUUID())
    }

    // TODO: delegate omission of hash to usersService
    return omit(user, 'passwordHash')
  }

  async signJwt({ id, email }: PlainUser): Promise<Tokens> {
    const payload: JwtPayload = { email, sub: id }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
