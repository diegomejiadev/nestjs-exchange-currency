import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ExchangeCurrencyInputDto {
  @ApiProperty({
    description: 'Valor inicial que va a ser convertido',
    default: 10,
    type: Number,
  })
  @Min(0, { message: 'Debe ingresar un valor mayor o igual a 0' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El monto ingresado debe ser numérico' },
  )
  @IsNotEmpty({ message: 'Debe ingresar el monto' })
  amount: number;

  @ApiProperty({
    description: 'Tipo de moneda de origen',
    default: 'USD',
  })
  @IsString({ message: 'Debe ingresar un texto en la moneda de origen' })
  @IsNotEmpty({ message: 'Debe ingresar una moneda de origen' })
  originCurrency: string;

  @ApiProperty({
    description: 'Tipo de moneda de destino',
    default: 'PEN',
  })
  @IsString({ message: 'Debe ingresar un texto en la moneda de destino' })
  @IsNotEmpty({ message: 'Debe ingresar una moneda de destino' })
  destinyCurrency: string;
}
