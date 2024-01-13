import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateCurrencyInputDto } from 'src/domain/dto/update-currency-input.dto';
import { ExchangeCurrencyEntity } from 'src/domain/entities/exchange-currency.entity';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';

@ApiTags('Currency')
@ApiBearerAuth()
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @ApiOperation({
    description:
      'Función que lista todos los tipos de monedas y sus valores con respecto a otras monedas',
  })
  @ApiOkResponse({
    description:
      'Valores obtenidos de forma exitosa con los tipos de monedas disponibles',
    type: [CurrencyEntity],
  })
  @ApiInternalServerErrorResponse({
    description:
      'Excepción manejada en caso de que no se pueda listar los tipos de monedas',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 500,
          path: '/api/currency/list',
          message: 'Internal server error',
        },
      },
    },
  })
  @Get('list')
  listAllCurrencies() {
    return this.currencyService.listAllCurrencies();
  }

  @ApiOperation({
    description:
      'Función encargada de la conversión de un tipo de moneda origen a un tipo de moneda destino',
  })
  @ApiCreatedResponse({
    description:
      'Información del cambio de moneda destino con el monto solicitado del tipo de moneda origen',
    type: ExchangeCurrencyEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Excepción manejada en caso de que el tipo de moneda de destino no exista',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 404,
          path: '/api/currency/exchange',
          message: 'No se encontró el tipo de cambio de destino',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description:
      'Excepción manejada en caso de que alguna de los tipos de moneda de origen no exista',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 404,
          path: '/api/currency/exchange',
          message: 'No se encontró el tipo de cambio de origen',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description:
      'Excepción manejada en caso de que el servidor presente un error interno al cambiar el tipo de moneda',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 500,
          path: '/api/currency/exchange',
          message: 'Internal server error',
        },
      },
    },
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
  @ApiCreatedResponse({
    description:
      'Carga de los valores iniciales de los tipos de moneda presentes',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Excepción manejada en caso de que no se pueda cargar los valores iniciales de los tipos de moneda',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 500,
          path: '/api/currency/load',
          message: 'Internal server error',
        },
      },
    },
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
  @ApiCreatedResponse({
    description:
      'Actualización del tipo de cambio de una moneda con respecto a los valores que tiene con otros tipos de monedas',
    type: CurrencyEntity,
  })
  @ApiNotFoundResponse({
    description:
      'Excepción manejada en caso de que el tipo de moneda de destino no exista',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 404,
          path: '/api/currency/exchange',
          message: 'No se encontró el tipo de cambio de destino',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description:
      'Excepción manejada en caso de que alguna de los tipos de moneda de origen no exista',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 404,
          path: '/api/currency/exchange',
          message: 'No se encontró el tipo de cambio de origen',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description:
      'Excepción manejada en caso de que el servidor presente un error interno al actualizar un tipo de moneda',
    schema: {
      items: {
        example: {
          timestamp: new Date().toISOString(),
          statusCode: 500,
          path: '/api/currency/list',
          message: 'Internal server error',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('update')
  updateCurrency(@Body() body: UpdateCurrencyInputDto) {
    return this.currencyService.updateCurrency(body);
  }
}
