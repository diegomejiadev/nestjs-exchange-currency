import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
