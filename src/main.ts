import { NestFactory } from '@nestjs/core';
import { CurrencyModule } from './presentation/currency.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    CurrencyModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
