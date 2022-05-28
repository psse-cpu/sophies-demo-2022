import { Strategy, IStrategyOptions } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserWithoutHash } from 'src/users/user-without-hash.dto'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' } as IStrategyOptions)
  }

  async validate(username: string, password: string): Promise<UserWithoutHash> {
    const user = await this.authService.authenticate(username, password)
    return user ?? Promise.reject(new UnauthorizedException())
  }
}
