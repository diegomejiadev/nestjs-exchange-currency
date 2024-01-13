import { ExchangeCurrencyInputDto } from '../dto/currency-input.dto';
import { ExchangeCurrencyEntity } from '../entities/currency.entity';

export interface CurrencyDataSource {
  exchangeCurrency(currencyInput: ExchangeCurrencyInputDto): Promise<ExchangeCurrencyEntity>;
  loadAllCurrencies(): Promise<boolean>;
}
