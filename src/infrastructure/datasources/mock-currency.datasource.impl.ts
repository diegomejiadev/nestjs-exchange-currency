import { CurrencyDataSource } from 'src/domain/datasource/currency.datasource';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';

export class MockCurrencyDatasourceImpl implements CurrencyDataSource {
  loadAllCurrencies(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async exchangeCurrency(
    currencyInput: CurrencyInputDto,
  ): Promise<CurrencyEntity> {
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
