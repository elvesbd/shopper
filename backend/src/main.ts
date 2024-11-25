import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationExceptionFilter } from '@application/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
  });
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(process.env.PORT ?? 8080);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
