import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: NestExpressApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nest Board Sample')
    .setDescription('Nest Board Sample Documentation')
    .setContact('Dok6n', 'https://github.com/Dok6n', 'ehrbs2018@gmail.com')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        description: 'Example: Asia/seoul',
        name: 'timezone',
        in: 'header',
      },
      'timezone',
    )
    .addApiKey(
      {
        type: 'apiKey',
        description: 'Example: c5022070-7c33-11ec-b3e9-55576f1317c0',
        name: 'uid',
        in: 'header',
      },
      'uid',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
}
