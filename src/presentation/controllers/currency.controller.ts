import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from '../guards/jwt.guard';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  exchangeCurrency(@Body() body: CurrencyInputDto) {
    return this.currencyService.exchangeCurrency(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  loadAllCurrencies() {
    return this.currencyService.loadAllCurrencies();
  }
}
