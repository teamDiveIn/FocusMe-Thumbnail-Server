import { config } from 'dotenv'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  await app.listen(3000)
}
bootstrap()
