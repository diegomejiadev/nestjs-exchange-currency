import { CurrencyInputDto } from '../dto/currency-input.dto';
import { CurrencyEntity } from '../entities/currency.entity';

export interface CurrencyRepository {
  exchangeCurrency(currencyInput: CurrencyInputDto): CurrencyEntity;
}
