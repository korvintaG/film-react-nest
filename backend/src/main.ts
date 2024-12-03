import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { configProvider } from './app.config.provider';
import { factoryLogger } from './logger/factory.logger';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha', {
    exclude: ['content'],
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const logger = factoryLogger(configProvider.useValue.logger);
  if (logger) app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
