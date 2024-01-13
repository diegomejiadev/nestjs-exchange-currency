import { ApiProperty } from '@nestjs/swagger';

export class ExchangeCurrencyEntity {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  baseAmount: number;

  @ApiProperty()
  originCurrency: string;

  @ApiProperty()
  destinyCurrency: string;

  @ApiProperty()
  exchangeType: string;

  @ApiProperty()
  lastUpdated: string;
}
