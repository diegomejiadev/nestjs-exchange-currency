import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CurrencyDataSource } from 'src/domain/datasource/currency.datasource';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';
import { ILoadCurrency } from 'src/domain/interfaces/load-currency.interface';
import {
  EURCurrency,
  GBPCurrency,
  PENCurrency,
  USDCurrency,
  YENCurrency,
} from 'src/core/constants/mock-json';

@Injectable()
export class RedisCurrencyDatasource implements CurrencyDataSource {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async loadAllCurrencies(): Promise<boolean> {
    await this.cacheManager.set('USD', JSON.stringify(USDCurrency));
    await this.cacheManager.set('EUR', JSON.stringify(EURCurrency));
    await this.cacheManager.set('PEN', JSON.stringify(PENCurrency));
    await this.cacheManager.set('YEN', JSON.stringify(YENCurrency));
    await this.cacheManager.set('GBP', JSON.stringify(GBPCurrency));

    return true;
  }

  async exchangeCurrency(
    currencyInput: CurrencyInputDto,
  ): Promise<CurrencyEntity> {
    const { amount, destinyCurrency, originCurrency } = currencyInput;

    const originCurrencyText = originCurrency.trim().toUpperCase();

    const foundCurrency: string | null =
      await this.cacheManager.get(originCurrencyText);

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
}
