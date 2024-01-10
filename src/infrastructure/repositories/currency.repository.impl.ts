import { Inject, Injectable } from '@nestjs/common';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';
import { CurrencyRepository } from 'src/domain/repositories/currency.repository';

@Injectable()
export class CurrencyRepositoryImpl implements CurrencyRepository {
  constructor(@Inject('CurrencyDatasource') private readonly currencyRepository: CurrencyRepository) {}

  exchangeCurrency(currencyInput: CurrencyInputDto): CurrencyEntity {
    return this.currencyRepository.exchangeCurrency(currencyInput);
  }
}
