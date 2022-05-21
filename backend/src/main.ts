import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN,
      credentials: true,
    },
  })
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
