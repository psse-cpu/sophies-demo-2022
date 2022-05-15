import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { GoogleOauthStrategy } from './google-oauth.strategy'
import { LocalStrategy } from './local.strategy'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, ConfigService, LocalStrategy, GoogleOauthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
