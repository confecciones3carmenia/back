import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateConfectionDto {
  @IsNotEmpty({ message: 'El campo orden de operación es requerido' })
  @IsString({ message: 'El campo orden de operación debe ser de tipo texto' })
  operationOrder: string;

  @IsNotEmpty({ message: 'El campo codigo prenda es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({
    message: 'El campo codigo prenda debe ser un identificador válido',
  })
  garmentCode: Types.ObjectId;

  @IsNotEmpty({ message: 'El campo operación es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({
    message: 'El campo operación debe ser un identificador válido',
  })
  operation: Types.ObjectId;

  @IsNotEmpty({ message: 'El campo operador es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({
    message: 'El campo operador debe ser un identificador válido',
  })
  operator: Types.ObjectId;

  @IsNotEmpty({ message: 'El campo unidades es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo unidades debe ser de tipo número' },
  )
  units: number;

  @IsNotEmpty({ message: 'El campo inicio de confección es requerido' })
  @IsString({ message: 'El campo inicio de confección debe ser de tipo texto' })
  initConfection: string;

  @IsNotEmpty({ message: 'El campo fin de confección es requerido' })
  @IsString({ message: 'El campo fin de confección debe ser de tipo texto' })
  endConfection: string;

  @IsNotEmpty({ message: 'El campo tiempo estimado es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo tiempo estimado debe ser de tipo número' },
  )
  estimatedTime: number;

  @IsNotEmpty({ message: 'El campo descuento de tiempo es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo descuento de tiempo debe ser de tipo número' },
  )
  discountTime: number;

  @IsNotEmpty({ message: 'El campo tiempo real trabajado es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo tiempo real trabajado debe ser de tipo número' },
  )
  realWorkTime: number;

  @IsNotEmpty({ message: 'El campo eficacia es requerido' })
  @IsString({ message: 'El campo eficacia debe ser de tipo texto' })
  efficiency: string;
}
