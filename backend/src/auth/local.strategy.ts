import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from 'src/users/user.entity'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(
    username: string,
    password: string
  ): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.authService.authenticate(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
