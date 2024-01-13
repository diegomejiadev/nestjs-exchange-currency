import { ExchangeCurrencyInputDto } from '../dto/exchange-currency-input.dto';
import { UpdateCurrencyInputDto } from '../dto/update-currency-input.dto';
import { CurrencyEntity } from '../entities/currency.entity';
import { ExchangeCurrencyEntity } from '../entities/exchange-currency.entity';

export interface CurrencyDataSource {
  //* Funcion encargada de realizar el cambio de moneda
  exchangeCurrency(
    currencyInput: ExchangeCurrencyInputDto,
  ): Promise<ExchangeCurrencyEntity>;

  //* Funcion que carga los tipos de moneda a la in-memory database
  loadAllCurrencies(): Promise<boolean>;

  //* Actualiza el valor de un tipo de moneda
  updateCurrency(
    updateCurrencyInputDto: UpdateCurrencyInputDto,
  ): Promise<CurrencyEntity>;

  //* Funcion que retorna todos los tipos de moneda presentes
  listAllCurrencies(): Promise<CurrencyEntity[]>;
}
