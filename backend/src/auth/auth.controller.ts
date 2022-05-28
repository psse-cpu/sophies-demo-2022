import { Controller, Req, Post, UseGuards, Res } from '@nestjs/common'

import Express from 'express'
import { UserWithoutHash } from 'src/users/user-without-hash.dto'
import { AuthService } from './auth.service'
import { GoogleOAuthGuard } from './google-oauth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() request: Express.Request,
    @Res({ passthrough: true }) response: Express.Response
  ): Promise<UserWithoutHash | undefined> {
    await this.setJwtCookie(request, response)
    return request.user as UserWithoutHash
  }

  @Post('/google')
  @UseGuards(GoogleOAuthGuard)
  async googleLogin(
    @Req() request: Express.Request,
    @Res({ passthrough: true }) response: Express.Response
  ): Promise<UserWithoutHash | undefined> {
    await this.setJwtCookie(request, response)
    return request.user as UserWithoutHash
  }

  private async setJwtCookie(
    request: Express.Request,
    response: Express.Response
  ): Promise<void> {
    const { accessToken } = await this.authService.signJwt(
      request.user as UserWithoutHash
    )
    response.cookie('jwt', accessToken, {
      httpOnly: true,
    })
  }
}
