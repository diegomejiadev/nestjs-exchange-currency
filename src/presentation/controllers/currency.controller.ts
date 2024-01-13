import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateCurrencyInputDto } from 'src/domain/dto/update-currency-input.dto';

@ApiTags('Currency')
@ApiBearerAuth()
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @ApiOperation({
    description:
      'Función encargada de la conversión de un tipo de moneda origen a un tipo de moneda destino',
  })
  @UseGuards(JwtAuthGuard)
  @Post('exchange')
  exchangeCurrency(@Body() body: ExchangeCurrencyInputDto) {
    return this.currencyService.exchangeCurrency(body);
  }

  @ApiOperation({
    description:
      'Función encargada de volver a cargar los valores por defecto de los tipos de moneda presentes',
  })
  @UseGuards(JwtAuthGuard)
  @Post('load')
  loadAllCurrencies() {
    return this.currencyService.loadAllCurrencies();
  }

  @ApiOperation({
    description:
      'Función encargada de actualizar un tipo de moneda con respecto a los valores con otro tipo de monedas',
  })
  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateCurrency(@Body() body: UpdateCurrencyInputDto) {
    return this.currencyService.updateCurrency(body);
  }
}
