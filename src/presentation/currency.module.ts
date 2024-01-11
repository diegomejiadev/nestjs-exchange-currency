import { CurrencyRepositoryImpl } from 'src/infrastructure/repositories/currency.repository.impl';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { Module } from '@nestjs/common';
import { RedisCurrencyDatasource } from 'src/infrastructure/datasources/redis-currency.datasource.impl';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/data/redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(), RedisModule],
  controllers: [CurrencyController],
  providers: [
    CurrencyService,
    {
      provide: 'CurrencyRepository',
      useClass: CurrencyRepositoryImpl,
    },
    {
      provide: 'CurrencyDatasource',
      useClass: RedisCurrencyDatasource,
    },
  ],
})
export class CurrencyModule {}
