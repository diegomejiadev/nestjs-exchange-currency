import { CurrencyInputDto } from '../dto/currency-input.dto';
import { CurrencyEntity } from '../entities/currency.entity';

export interface CurrencyDataSource {
  exchangeCurrency(currencyInput: CurrencyInputDto): Promise<CurrencyEntity>;
  loadAllCurrencies(): Promise<boolean>;
}
