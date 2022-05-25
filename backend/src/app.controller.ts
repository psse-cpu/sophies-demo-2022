import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('/')
  root(): { alive: true } {
    return { alive: true }
  }
}
