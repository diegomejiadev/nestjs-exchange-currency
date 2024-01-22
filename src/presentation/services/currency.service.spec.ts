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
        updated_at: expect.any(String),
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
        updated_at: expect.any(String),
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
        updated_at: expect.any(String),
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

    expect(await service.listAllCurrencies()).toEqual(result);
  });

  it('should exchange a currency', async () => {
    const result = {
      amount: 7,
      baseAmount: 3.5,
      lastUpdated: expect.any(String),
      destinyCurrency: 'PEN',
      originCurrency: 'USD',
      exchangeType: `USD -> PEN`,
    };

    const body: ExchangeCurrencyInputDto = {
      amount: 2,
      destinyCurrency: 'PEN',
      originCurrency: 'USD',
    };

    expect(await service.exchangeCurrency(body)).toEqual(result);
  });

  it('should update currency', async () => {
    const body: UpdateCurrencyInputDto = {
      code: 'PEN',
      data: {
        USD: 3.5,
        EUR: 4.2,
        YEN: 10.6,
      },
    };

    const result = {
      code: 'PEN',
      updated_at: expect.any(String),
      data: {
        USD: {
          code: 'USD',
          value: 3.5,
        },
        EUR: {
          code: 'EUR',
          value: 4.2,
        },
        YEN: {
          code: 'YEN',
          value: 10.6,
        },
      },
    };

    expect(await service.updateCurrency(body)).toEqual(result);
  });

  it('should load all currencies', async () => {
    const result = true;

    expect(await service.loadAllCurrencies()).toBe(result);
  });
});
