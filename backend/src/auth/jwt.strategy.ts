import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { Request } from 'express'
import { JwtPayload } from './auth.service'

const extractJwtFromCookie =
  (cookieName = 'jwt') =>
  (request: Request) =>
    request?.cookies?.[cookieName]

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        extractJwtFromCookie(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    } as StrategyOptions)
  }

  async validate(payload: JwtPayload): Promise<{ id: number; email: string }> {
    return { id: payload.sub, email: payload.email }
  }
}
