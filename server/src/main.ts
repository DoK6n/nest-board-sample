import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getMyIp, setupSwagger } from 'common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(process.env.PORT || 3000);

  Logger.log(`Server running on ${getMyIp()}:${process.env.PORT || 3000}`, 'NestBootstrap');
}
bootstrap();
