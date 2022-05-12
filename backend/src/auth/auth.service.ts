import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import omit from 'lodash/omit'

import { User } from '../users/user.entity'
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
}
