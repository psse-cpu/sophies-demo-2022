import { Controller, Get, Req, Post, UseGuards } from '@nestjs/common'
import { Express } from 'express'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Req() request: Express.Request
  ): Promise<Express.User | undefined> {
    return request.user
  }
}
