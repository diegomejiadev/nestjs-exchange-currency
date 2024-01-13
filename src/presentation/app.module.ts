import { RedisLocalModule } from '../data/redis/redis.module';
import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';
import { CurrencyModule } from './currency.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RedisLocalModule,
    AuthModule,
    CurrencyModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
