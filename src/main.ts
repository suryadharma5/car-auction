import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // ini agar tidak ada field tambahan yang disimpan diluar DTO
      whitelist: true
    })
  )
  await app.listen(3000);
}
bootstrap();
