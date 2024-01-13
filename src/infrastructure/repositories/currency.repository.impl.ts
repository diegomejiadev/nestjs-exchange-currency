import { Inject, Injectable } from '@nestjs/common';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { ExchangeCurrencyEntity } from 'src/domain/entities/currency.entity';
import { CurrencyRepository } from 'src/domain/repositories/currency.repository';

@Injectable()
export class CurrencyRepositoryImpl implements CurrencyRepository {
  constructor(
    @Inject('CurrencyDatasource')
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  async exchangeCurrency(currencyInput: ExchangeCurrencyInputDto): Promise<ExchangeCurrencyEntity> {
    return await this.currencyRepository.exchangeCurrency(currencyInput);
  }

  loadAllCurrencies(): Promise<boolean> {
    return this.currencyRepository.loadAllCurrencies();
  }
}
