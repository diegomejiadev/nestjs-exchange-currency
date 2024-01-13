import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { swaggerSetup } from './utils/swagger';
import { AppModule } from './presentation/app.module';
import { HttpExceptionFilter } from './core/exceptions/http.exception';

async function bootstrap() {
  //* Indicamos que va a estar levantado en Fastify
  const app = await NestFactory.create(AppModule);

  // * Agregamos un Pipe para la validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  //* Agregamos un filter para el control de excepciones
  app.useGlobalFilters(new HttpExceptionFilter());

  //* Ingresamos el prefijo global para llamar a la API
  app.setGlobalPrefix('/api');

  //* Llamamos la funcion que activa Swagger
  swaggerSetup(app);

  //* Indicamos el Puerto en el que va a escuchar el servidor
  await app.listen(3000);
}
bootstrap();
