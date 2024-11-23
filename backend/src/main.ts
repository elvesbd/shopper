import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationExceptionFilter } from '@application/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
