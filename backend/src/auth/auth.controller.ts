import { Controller, Req, Post, UseGuards, Get, Res } from '@nestjs/common'

import Express from 'express'
import { PlainUser } from 'src/users/user.entity'
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
  ): Promise<PlainUser | undefined> {
    await this.setJwtCookie(request, response)
    return request.user as PlainUser
  }

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async googleLogin(@Req() _request: Express.Request): Promise<void> {}

  @Get('/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleLoginRedirect(
    @Req() request: Express.Request,
    @Res({ passthrough: true }) response: Express.Response
  ): Promise<PlainUser | undefined> {
    await this.setJwtCookie(request, response)
    return request.user as PlainUser
  }

  private async setJwtCookie(
    request: Express.Request,
    response: Express.Response
  ): Promise<void> {
    const { accessToken } = await this.authService.signJwt(
      request.user as PlainUser
    )
    response.cookie('jwt', accessToken, {
      httpOnly: true,
    })
  }
}
