import { Inject, Injectable } from '@nestjs/common';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { UpdateCurrencyInputDto } from 'src/domain/dto/update-currency-input.dto';
import { CurrencyEntity } from 'src/domain/entities/currency.entity';
import { ExchangeCurrencyEntity } from 'src/domain/entities/exchange-currency.entity';
import { CurrencyRepository } from 'src/domain/repositories/currency.repository';

@Injectable()
export class CurrencyRepositoryImpl implements CurrencyRepository {
  constructor(
    @Inject('CurrencyDatasource')
    private readonly currencyRepository: CurrencyRepository,
  ) {}
  async updateCurrency(
    updateCurrencyInputDto: UpdateCurrencyInputDto,
  ): Promise<CurrencyEntity> {
    return await this.currencyRepository.updateCurrency(updateCurrencyInputDto);
  }

  async exchangeCurrency(
    currencyInput: ExchangeCurrencyInputDto,
  ): Promise<ExchangeCurrencyEntity> {
    return await this.currencyRepository.exchangeCurrency(currencyInput);
  }

  loadAllCurrencies(): Promise<boolean> {
    return this.currencyRepository.loadAllCurrencies();
  }
}
