import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateCurrencyInputDto } from 'src/domain/dto/update-currency-input.dto';

@ApiBearerAuth()
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('exchange')
  exchangeCurrency(@Body() body: ExchangeCurrencyInputDto) {
    return this.currencyService.exchangeCurrency(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  loadAllCurrencies() {
    return this.currencyService.loadAllCurrencies();
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateCurrency(@Body() body: UpdateCurrencyInputDto) {
    return this.currencyService.updateCurrency(body);
  }
}
