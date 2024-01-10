import { CurrencyDataSource } from 'src/domain/datasource/currency.datasource';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';

export class MockCurrencyDatasourceImpl implements CurrencyDataSource {
  exchangeCurrency(currencyInput: CurrencyInputDto): CurrencyEntity {
    return {
      amount: currencyInput.amount * 3.5,
      baseAmount: 3.5,
      destinyCurrency: currencyInput.destinyCurrency,
      originCurrency: currencyInput.originCurrency,
      exchangeType: `${currencyInput.originCurrency} -> ${currencyInput.destinyCurrency}`, //TODO Cambiar por precios y eso
    };
  }
}
