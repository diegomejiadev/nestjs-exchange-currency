import { ExchangeCurrencyInputDto } from '../dto/exchange-currency-input.dto';
import { ExchangeCurrencyEntity } from '../entities/exchange-currency.entity';

export interface CurrencyRepository {
  exchangeCurrency(currencyInput: ExchangeCurrencyInputDto): Promise<ExchangeCurrencyEntity>;
  loadAllCurrencies(): Promise<boolean>;
}
