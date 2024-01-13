import { Inject, Injectable } from '@nestjs/common';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { UpdateCurrencyInputDto } from 'src/domain/dto/update-currency-input.dto';
import { CurrencyRepository } from 'src/domain/repositories/currency.repository';

@Injectable()
export class CurrencyService {
  constructor(
    @Inject('CurrencyRepository')
    private readonly currencyRepository: CurrencyRepository,
  ) {}

  exchangeCurrency(currencyInput: ExchangeCurrencyInputDto) {
    return this.currencyRepository.exchangeCurrency(currencyInput);
  }

  loadAllCurrencies() {
    return this.currencyRepository.loadAllCurrencies();
  }

  updateCurrency(updateCurrencyInputDto: UpdateCurrencyInputDto) {
    return this.currencyRepository.updateCurrency(updateCurrencyInputDto);
  }
}
