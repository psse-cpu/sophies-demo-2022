import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import omit from 'lodash/omit'
import crypto from 'crypto'

import { User, UserWithoutHash } from '../users/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
  ): Promise<UserWithoutHash> {
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
}
