import { Controller, Req, Post, UseGuards, Get } from '@nestjs/common'
import { Express } from 'express'
import { GoogleOAuthGuard } from './google-oauth.guard'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('/auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Req() request: Express.Request
  ): Promise<Express.User | undefined> {
    return request.user
  }

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async googleLogin(@Req() _request: Express.Request): Promise<void> {}

  @Get('/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleLoginRedicect(
    @Req() request: Express.Request
  ): Promise<Express.User | undefined> {
    return request.user
  }
}
