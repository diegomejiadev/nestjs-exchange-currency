import { ApiProperty } from '@nestjs/swagger';

export class CurrencyEntity {
  @ApiProperty()
  code: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  data: Record<
    string,
    {
      code: string;
      value: number;
    }
  >;
}
