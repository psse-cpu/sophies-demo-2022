import { Controller, Req, Post, UseGuards } from '@nestjs/common'
import { Express } from 'express'
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
}
