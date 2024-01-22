import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from './currency.service';
import { MockCurrencyDatasourceImpl } from '../../infrastructure/datasources/mock-currency.datasource.impl';
import { CurrencyRepositoryImpl } from '../../infrastructure/repositories/currency.repository.impl';
import { ExchangeCurrencyInputDto } from '../../domain/dto/exchange-currency-input.dto';
import { UpdateCurrencyInputDto } from '../../domain/dto/update-currency-input.dto';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: 'CurrencyRepository',
          useClass: CurrencyRepositoryImpl,
        },
        {
          provide: 'CurrencyDatasource',
          useClass: MockCurrencyDatasourceImpl,
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
  });

  it('should list all currencies', async () => {
    const result = [
      {
        code: 'PEN',
        updated_at: '2024-01-21T23:13:21.334Z',
        data: {
          USD: {
            code: 'USD',
            value: 0.27,
          },
          EUR: {
            code: 'EUR',
            value: 0.25,
          },
        },
      },
      {
        code: 'USD',
        updated_at: '2024-01-21T23:13:21.334Z',
        data: {
          EUR: {
            code: 'EUR',
            value: 0.91,
          },
          PEN: {
            code: 'PEN',
            value: 3.7,
          },
        },
      },
      {
        code: 'EUR',
        updated_at: '2024-01-21T23:13:21.334Z',
        data: {
          USD: {
            code: 'USD',
            value: 1.1,
          },
          PEN: {
            code: 'PEN',
            value: 4.07,
          },
        },
      },
    ];

    expect(await service.listAllCurrencies()).toStrictEqual(result);
  });

  it('should exchange a currency', async () => {
    const result = {
      amount: 7,
      baseAmount: 3.5,
      lastUpdated: '2024-01-11T12:37:52.821',
      destinyCurrency: 'PEN',
      originCurrency: 'USD',
      exchangeType: `USD -> PEN`,
    };

    const body: ExchangeCurrencyInputDto = {
      amount: 2,
      destinyCurrency: 'PEN',
      originCurrency: 'USD',
    };

    expect(await service.exchangeCurrency(body)).toStrictEqual(result);
  });

  it('should update currency', async () => {
    const result = {
      code: 'PEN',
      updated_at: '2024-01-21T23:13:21.334Z',
      data: {
        USD: {
          code: 'USD',
          value: 3.7,
        },
        EUR: {
          code: 'EUR',
          value: 4,
        },
      },
    };

    const body: UpdateCurrencyInputDto = {
      code: 'PEN',
      data: {
        USD: 3.7,
        EUR: 4,
      },
    };

    expect(await service.updateCurrency(body)).toStrictEqual(result);
  });

  it('should load all currencies', async () => {
    const result = true;

    expect(await service.loadAllCurrencies()).toBe(result);
  });
});
