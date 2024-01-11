import { Inject, Injectable } from '@nestjs/common';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';
import { CurrencyRepository } from 'src/domain/repositories/currency.repository';

@Injectable()
export class CurrencyRepositoryImpl implements CurrencyRepository {
  constructor(
    @Inject('CurrencyDatasource')
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  async exchangeCurrency(currencyInput: CurrencyInputDto): Promise<CurrencyEntity> {
    return await this.currencyRepository.exchangeCurrency(currencyInput);
  }

  loadAllCurrencies(): Promise<boolean> {
    return this.currencyRepository.loadAllCurrencies();
  }
}
