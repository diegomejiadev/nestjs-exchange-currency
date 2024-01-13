import { RedisService } from '@liaoliaots/nestjs-redis';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import {
  USDCurrency,
  EURCurrency,
  PENCurrency,
  YENCurrency,
  GBPCurrency,
} from 'src/core/constants/mock-json';
import { CurrencyDataSource } from 'src/domain/datasource/currency.datasource';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { UpdateCurrencyInputDto } from 'src/domain/dto/update-currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';
import { ExchangeCurrencyEntity } from 'src/domain/entities/exchange-currency.entity';
import { ILoadCurrency } from 'src/domain/interfaces/load-currency.interface';

@Injectable()
export class RedisCurrencyDatasource implements CurrencyDataSource {
  private readonly client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getClient();
  }

  /*
   * LIST ALL CURRENCIES
   */
  async listAllCurrencies(): Promise<CurrencyEntity[]> {
    //* Obtenemos todas las keys presentes en la in-memory database
    const keys = await this.client.keys('*');

    //* Hacemos la peticion de esas keys a la in-memory database
    const promises = keys.map(async (key) => await this.client.get(key));

    //* Ejecutamos las promesas con un Promise.all
    const currencies = await Promise.all(promises);

    //* Convertimos el string a JSON
    const parsedCurrencies: ILoadCurrency[] = currencies.map((currency) =>
      JSON.parse(currency),
    );

    return parsedCurrencies.map((currency) => ({
      code: currency.code,
      updated_at: currency.meta.last_updated_at,
      data: currency.data,
    }));
  }

  /*
   * UPDATE CURRENCY
   */
  async updateCurrency(
    updateCurrencyInputDto: UpdateCurrencyInputDto,
  ): Promise<CurrencyEntity> {
    //* Desestructuramos el input
    const { code, data } = updateCurrencyInputDto;

    //* Creamos una constante con el código ingresado pero convertido a mayusculas
    const originCurrencyText = code.trim().toUpperCase();

    //* Buscamos si existe el tipo de moneda de origen en la in-memory database
    const foundCurrency: string | null =
      await this.client.get(originCurrencyText);

    //* Si no existe el tipo de moneda a actualizar de inmediato lanzamos un error
    if (!foundCurrency) {
      throw new NotFoundException(
        'No se encontró el tipo de moneda a actualizar',
      );
    }

    //* Convertimos el string a JSON
    const parsedFoundCurrency: ILoadCurrency = JSON.parse(foundCurrency);

    //* Ahora en base al campo "data" vamos a recorrer cada key buscando que exista esos tipos de moneda, donde en uno de los campos vamos a solicitar su valor en la in-memory database
    //? Se toma en cuneta que uno de los campos recorridos es una Promesa
    const promises = Object.keys(data).map(async (currencyCode) => {
      return {
        code: currencyCode,
        data: await this.client.get(currencyCode.trim().toUpperCase()),
      };
    });

    //* Ejecutamos las promesas con un Promise.all
    const destinyCurrencies = await Promise.all(promises);

    //* Filtramos los tipos de moneda buscados, y si alguno de sus valores en ["data"] fuese null quiere decir que es un código de tipo de moneda no existente
    const nonExistingDestinyCurrencies = destinyCurrencies.filter((v) => {
      return v.data == null;
    });

    //* Si hubiese al menos un código de tipo de moneda no existente procedemos a lanzar un error
    if (nonExistingDestinyCurrencies.length) {
      throw new BadRequestException(
        `No existen los siguientes códigos de tipo de moneda: ${nonExistingDestinyCurrencies
          .map((t) => t.code)
          .join(', ')}`,
      );
    }

    /*
     * Vamos a actualizar esos valores en el tipo de moneda original
     */
    for (const [currencyCode, value] of Object.entries(data)) {
      parsedFoundCurrency.data[currencyCode]['value'] = value;
    }
    parsedFoundCurrency.meta.last_updated_at = new Date().toISOString();

    await this.client.set(
      originCurrencyText,
      JSON.stringify(parsedFoundCurrency),
    );

    /*
     * Ahora vamos a aplicar el tipo de cambio a la inversa en las monedas de destino
     */
    const auxPromises = destinyCurrencies.map(async (auxCurrency) => {
      const tempCurrency: ILoadCurrency = JSON.parse(auxCurrency.data);

      const [, matchingDestinyValue] = Object.entries(data).find(
        ([innerCode]) => innerCode.trim().toUpperCase() == tempCurrency.code,
      );
      tempCurrency.data[originCurrencyText]['value'] = 1 / matchingDestinyValue;
      tempCurrency.meta.last_updated_at = new Date().toISOString();

      await this.client.set(tempCurrency.code, JSON.stringify(tempCurrency));
    });

    await Promise.all(auxPromises);

    //* Ahora retornamos el tipo de moneda actualizado
    return {
      code,
      updated_at: new Date().toISOString(),
      data: parsedFoundCurrency.data,
    };
  }

  /*
   * EXCHANGE CURRENCY
   */
  async exchangeCurrency(
    currencyInput: ExchangeCurrencyInputDto,
  ): Promise<ExchangeCurrencyEntity> {
    //* Desestructuramos el input
    const { amount, destinyCurrency, originCurrency } = currencyInput;

    //* Creamos una constante con el código ingresado pero convertido a mayusculas
    const originCurrencyText = originCurrency.trim().toUpperCase();

    //* Buscamos si existe el tipo de moneda de origen en la in-memory database
    const foundCurrency: string | null =
      await this.client.get(originCurrencyText);

    //* Si no encuentra el tipo de moneda de origen en la in-memory database procede a lanzar una excepción (404)
    if (!foundCurrency) {
      throw new NotFoundException(
        'No se encontró el tipo de cambio de destino',
      );
    }

    //* Parseamos el string a JSON
    const parsedFoundCurrency: ILoadCurrency = JSON.parse(foundCurrency);

    //* Extraemos el tipo de moneda destino del tipo de moneda de origen retornada de la BD
    const matchingDestinyCurrency =
      parsedFoundCurrency['data'][destinyCurrency.trim().toUpperCase()];

    //* Si el tipo de moneda destino no existe en los valores del tipo de moneda de origen de la BD lanzamos una excepcion (404)
    if (!matchingDestinyCurrency) {
      throw new NotFoundException('No se encontró el tipo de cambio de origen');
    }

    //* Retornamos un objeto ExchangeCurrencyEntity
    return {
      amount: amount * matchingDestinyCurrency.value,
      baseAmount: matchingDestinyCurrency.value,
      destinyCurrency: originCurrencyText,
      exchangeType: `${parsedFoundCurrency.code} -> ${matchingDestinyCurrency.code}`,
      originCurrency: matchingDestinyCurrency.code,
      lastUpdated: parsedFoundCurrency.meta.last_updated_at,
    };
  }

  /*
   * LOAD ALL CURRENCIES
   */
  async loadAllCurrencies(): Promise<boolean> {
    //* Cargamos a Redis los valores base de los tipos de cambio
    await this.client.set('USD', JSON.stringify(USDCurrency));
    await this.client.set('EUR', JSON.stringify(EURCurrency));
    await this.client.set('PEN', JSON.stringify(PENCurrency));
    await this.client.set('YEN', JSON.stringify(YENCurrency));
    await this.client.set('GBP', JSON.stringify(GBPCurrency));

    return true;
  }
}
