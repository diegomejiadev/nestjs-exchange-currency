import { Inject, Injectable } from '@nestjs/common';
import { CurrencyInputDto } from 'src/domain/dto/currency-input.dto';
import { CurrencyRepository } from 'src/domain/repositories/currency.repository';

@Injectable()
export class CurrencyService {
  constructor(
    @Inject('CurrencyRepository')
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  exchangeCurrency(currencyInput: CurrencyInputDto) {
    return this.currencyRepository.exchangeCurrency(currencyInput);
  }

  loadAllCurrencies() {
    return this.currencyRepository.loadAllCurrencies();
  }
}
