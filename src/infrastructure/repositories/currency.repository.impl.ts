import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';
import { CurrencyRepository } from 'src/domain/repositories/currency.repository';

export class CurrencyRepositoryImpl implements CurrencyRepository {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  exchangeCurrency(currencyInput: CurrencyInputDto): CurrencyEntity {
    return this.currencyRepository.exchangeCurrency(currencyInput);
  }
}
