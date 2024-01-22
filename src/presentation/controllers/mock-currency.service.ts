import { Injectable } from '@nestjs/common';
import { ExchangeCurrencyEntity } from '../../domain/entities/exchange-currency.entity';
import { ExchangeCurrencyInputDto } from '../../domain/dto/exchange-currency-input.dto';

@Injectable()
export class MockCurrencyService {
  exchangeCurrency(
    currencyInput: ExchangeCurrencyInputDto,
  ): Promise<ExchangeCurrencyEntity> {
    const exchangeValue = Math.random() * (100 - 1) + 1;

    return Promise.resolve({
      amount: exchangeValue * currencyInput.amount,
      baseAmount: exchangeValue,
      lastUpdated: new Date().toISOString(),
      originCurrency: currencyInput.originCurrency,
      destinyCurrency: currencyInput.destinyCurrency,
      exchangeType: `${currencyInput.originCurrency} -> ${currencyInput.destinyCurrency}`,
    });
  }

  loadAllCurrencies() {
    return Promise.resolve(true);
  }

  listAllCurrencies() {
    return Promise.resolve([
      {
        code: 'PEN',
        updated_at: new Date().toISOString(),
        data: {
          USD: {
            code: 'USD',
            value: 0.27,
          },
          EUR: {
            code: 'EUR',
            value: 0.25,
          },
        },
      },
      {
        code: 'USD',
        updated_at: new Date().toISOString(),
        data: {
          EUR: {
            code: 'EUR',
            value: 0.91,
          },
          PEN: {
            code: 'PEN',
            value: 3.7,
          },
        },
      },
    ]);
  }
}
