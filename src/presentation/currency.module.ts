import { CurrencyRepositoryImpl } from 'src/infrastructure/repositories/currency.repository.impl';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { Module } from '@nestjs/common';
import { MockCurrencyDatasourceImpl } from 'src/infrastructure/datasources/mock-currency.datasource.impl';

@Module({
  imports: [],
  controllers: [CurrencyController],
  providers: [
    CurrencyService,
    {
      provide: 'CurrencyRepository',
      useClass: CurrencyRepositoryImpl,
    },
    {
      provide: 'CurrencyDatasource',
      useClass: MockCurrencyDatasourceImpl,
    },
  ],
})
export class CurrencyModule {}
