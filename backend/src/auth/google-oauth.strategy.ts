import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-google-verify-token'
import { RegistrationSource } from '../users/registration-source'
import { UserWithoutHash } from '../users/user.entity'

import { AuthService } from './auth.service'

export interface GoogleIdToken {
  iss: string
  nbf: number
  aud: string
  sub: string
  email: string
  email_verified: boolean
  azp: string
  name: string
  picture: string
  given_name: string
  family_name: string
  iat: number
  exp: number
  jti: string
}

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
    })
  }

  async validate(
    parsedToken: GoogleIdToken,
    _id: string
  ): Promise<UserWithoutHash | undefined> {
    try {
      return this.authService.handleProviderLogin({
        email: parsedToken.email,
        familyName: parsedToken.family_name,
        givenName: parsedToken.given_name,
        registrationSource: RegistrationSource.GOOGLE,
      })
    } catch {
      throw new UnauthorizedException()
    }
  }
}
