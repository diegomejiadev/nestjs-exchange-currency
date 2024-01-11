import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerSetup = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Joyit Exchange Currency')
    .setDescription(
      'Proyecto desarrollado en NestJS para la conversión de divisas',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};
