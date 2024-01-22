import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from '../services/currency.service';
import { CurrencyController } from './currency.controller';
import { ExchangeCurrencyInputDto } from 'src/domain/dto/exchange-currency-input.dto';
import { ExchangeCurrencyEntity } from 'src/domain/entities/exchange-currency.entity';
import { MockCurrencyService } from './mock-currency.service';

describe('CurrencyController', () => {
  let controller: CurrencyController;
  let service: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [CurrencyService],
    })
      .overrideProvider(CurrencyService)
      .useClass(MockCurrencyService)
      .compile();

    controller = module.get<CurrencyController>(CurrencyController);
    service = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should exchange a currency', async () => {
    const body: ExchangeCurrencyInputDto = {
      amount: 5,
      destinyCurrency: 'PEN',
      originCurrency: 'USD',
    };

    const result: ExchangeCurrencyEntity = {
      amount: expect.any(Number),
      baseAmount: expect.any(Number),
      destinyCurrency: 'PEN',
      exchangeType: 'USD -> PEN',
      originCurrency: 'USD',
      lastUpdated: expect.any(String),
    };

    expect(await controller.exchangeCurrency(body)).toEqual(result);

    const exchangeCurrencySpy = jest.spyOn(service, 'exchangeCurrency');
    await service.exchangeCurrency(body);

    expect(exchangeCurrencySpy).toHaveBeenCalledWith(body);
  });

  it('should load all currencies', async () => {
    expect(await controller.loadAllCurrencies()).toBe(true);
  });

  it('list all currencies', async () => {
    const result = await controller.listAllCurrencies();

    result.forEach((resultItem) => {
      expect(resultItem).toMatchSnapshot({
        code: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });
});
