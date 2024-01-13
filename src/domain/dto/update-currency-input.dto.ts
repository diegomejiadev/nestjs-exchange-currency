import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  ValidationArguments,
  ValidationOptions,
  isObject,
  registerDecorator,
} from 'class-validator';

const IsRecord = (validationOptions?: ValidationOptions) => {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsRecord',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: {
        message: 'Wrong object format',
        ...validationOptions,
      },
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          if (!isObject(value)) return false;
          if (Object.keys(value).length === 0) return true;

          const keys = Object.keys(value);

          return keys.every((key) => {
            if (typeof key !== 'string') return false;
            if (typeof value[key] !== 'number') return false;

            return true;
          });
        },
      },
    });
  };
};

export class UpdateCurrencyInputDto {
  @ApiProperty({
    description: 'Código del tipo de moneda a actualizar',
    default: 'PEN',
    type: String,
  })
  @IsString({ message: 'Debe ingresar un texto del tipo de moneda' })
  @IsNotEmpty({ message: 'Debe ingresar un tipo de moneda' })
  code: string;

  @ApiProperty({
    description: 'Monedas a las que se les va a actualizar el tipo de cambio',
    default: {
      USD: 3.7,
      EUR: 4,
    },
  })
  @IsRecord({
    message:
      'Los valores en los tipos de moneda destino a actualizar debe ser { "COD": 123, "CAD": 456 }',
  })
  @IsNotEmpty({
    message: 'Debe ingresar los valores a actualizar en los tipos de moneda',
  })
  data: Record<string, number>;
}
