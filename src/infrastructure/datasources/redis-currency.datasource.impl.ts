import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Redis } from 'ioredis';
import {
  USDCurrency,
  EURCurrency,
  PENCurrency,
  YENCurrency,
  GBPCurrency,
} from 'src/core/constants/mock-json';
import { CurrencyDataSource } from 'src/domain/datasource/currency.datasource';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';
import { ILoadCurrency } from 'src/domain/interfaces/load-currency.interface';

@Injectable()
export class RedisCurrencyDatasource implements CurrencyDataSource {
  private readonly client: Redis;

  constructor(private readonly redisService: RedisService) {
    this.client = this.redisService.getClient();
  }

  async exchangeCurrency(
    currencyInput: CurrencyInputDto,
  ): Promise<CurrencyEntity> {
    const { amount, destinyCurrency, originCurrency } = currencyInput;

    const originCurrencyText = originCurrency.trim().toUpperCase();

    const foundCurrency: string | null =
      await this.client.get(originCurrencyText);

    if (!foundCurrency) {
      throw new NotFoundException(
        'No se encontró el tipo de cambio de destino',
      );
    }

    const parsedFoundCurrency: ILoadCurrency = JSON.parse(foundCurrency);

    const matchingDestinyCurrency =
      parsedFoundCurrency['data'][destinyCurrency.trim().toUpperCase()];

    if (!matchingDestinyCurrency) {
      throw new NotFoundException('No se encontró el tipo de cambio de origen');
    }

    return {
      amount: amount * matchingDestinyCurrency.value,
      baseAmount: matchingDestinyCurrency.value,
      destinyCurrency: originCurrencyText,
      exchangeType: `${parsedFoundCurrency.code} -> ${matchingDestinyCurrency.code}`,
      originCurrency: matchingDestinyCurrency.code,
      lastUpdated: parsedFoundCurrency.meta.last_updated_at,
    };
  }
  async loadAllCurrencies(): Promise<boolean> {
    await this.client.set('USD', JSON.stringify(USDCurrency));
    await this.client.set('EUR', JSON.stringify(EURCurrency));
    await this.client.set('PEN', JSON.stringify(PENCurrency));
    await this.client.set('YEN', JSON.stringify(YENCurrency));
    await this.client.set('GBP', JSON.stringify(GBPCurrency));

    return true;
  }
}
