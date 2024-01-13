import { ApiProperty } from '@nestjs/swagger';

export class CurrencyEntity {
  @ApiProperty({
    default: 'PEN',
  })
  code: string;

  @ApiProperty({
    default: new Date().toISOString(),
  })
  updated_at: string;

  @ApiProperty({
    default: {
      USD: {
        code: 'USD',
        value: 0.27,
      },
      EUR: {
        code: 'EUR',
        value: 0.25,
      },
    },
  })
  data: Record<
    string,
    {
      code: string;
      value: number;
    }
  >;
}
