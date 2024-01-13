import { CurrencyDataSource } from 'src/domain/datasource/currency.datasource';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { ExchangeCurrencyEntity } from 'src/domain/entities/exchange-currency.entity';

export class MockCurrencyDatasourceImpl implements CurrencyDataSource {
  async loadAllCurrencies(): Promise<boolean> {
    return true;
  }
  async exchangeCurrency(
    currencyInput: ExchangeCurrencyInputDto,
  ): Promise<ExchangeCurrencyEntity> {
    return {
      amount: currencyInput.amount * 3.5,
      baseAmount: 3.5,
      lastUpdated: '2024-01-11T12:37:52.821',
      destinyCurrency: currencyInput.destinyCurrency,
      originCurrency: currencyInput.originCurrency,
      exchangeType: `${currencyInput.originCurrency} -> ${currencyInput.destinyCurrency}`, //TODO Cambiar por precios y eso
    };
  }
}
