import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  private greeting = 'Hello World!'

  getHello(): string {
    return this.greeting
  }
}
