import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.FRONTEND_ORIGIN,
      credentials: true,
    },
  })

  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  if (process.env.NODE_ENV === 'test') {
    setInterval(() => {
      console.log('*'.repeat(70))
      console.log(
        '* WARNING: this is running in a TEST environment, NOT DEV!!!'
      )
      console.log('*'.repeat(70))
    }, 60_000)
  }

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
