import { Injectable } from '@nestjs/common'

// TODO: consider removing this file
// labels: tech-debt
@Injectable()
export class AppService {
  private greeting = 'Hello World!'

  getHello(): string {
    return this.greeting
  }
}
