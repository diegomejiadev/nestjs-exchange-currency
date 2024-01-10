import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CurrencyInputDto {
  @Min(0, { message: 'Debe ingresar un valor mayor o igual a 0' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'El monto ingresado debe ser numérico' },
  )
  @IsNotEmpty({ message: 'Debe ingresar el monto' })
  amount: number;

  @IsString({ message: 'Debe ingresar un texto en la moneda de origen' })
  @IsNotEmpty({ message: 'Debe ingresar una moneda de origen' })
  originCurrency: string;

  @IsString({ message: 'Debe ingresar un texto en la moneda de destino' })
  @IsNotEmpty({ message: 'Debe ingresar una moneda de destino' })
  destinyCurrency: string;
}
