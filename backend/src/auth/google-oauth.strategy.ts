import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20'
import { UserWithoutHash } from 'src/users/user.entity'

import { AuthService } from './auth.service'

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(
  Strategy,
  'google-oauth'
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_OAUTH_REDIRECT_URL'),
      scope: ['email', 'profile'],
    } as StrategyOptions)
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<UserWithoutHash> {
    try {
      const email = profile.emails?.[0]?.value ?? ''
      return this.authService.handleProviderLogin(email, 'google-oauth')
    } catch (e) {
      throw new UnauthorizedException()
    }
  }
}
