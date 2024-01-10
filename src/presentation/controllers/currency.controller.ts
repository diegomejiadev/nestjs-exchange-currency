import { Body, Controller, Post } from '@nestjs/common';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyService } from '../services/currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  exchangeCurrency(@Body() body: CurrencyInputDto) {
    return this.currencyService.exchangeCurrency(body);
  }
}
