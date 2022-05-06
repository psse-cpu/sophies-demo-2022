import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  private greeting = 'Hello World!';

  getHello(): string {
    return this.greeting;
  }
}
