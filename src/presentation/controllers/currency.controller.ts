import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  exchangeCurrency(@Body() body: ExchangeCurrencyInputDto) {
    return this.currencyService.exchangeCurrency(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  loadAllCurrencies() {
    return this.currencyService.loadAllCurrencies();
  }
}
