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
        description: 'Example: 123456ab-78cd-9e0f-gg8h-7654i3210j1k',
        name: 'uid',
        in: 'header',
      },
      'uid',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document);
}
