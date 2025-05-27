import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateCuttingDto {
  @IsNotEmpty({ message: 'El campo fecha es requerido' })
  @IsString({ message: 'El campo fecha debe ser de tipo texto' })
  date: string;

  @IsNotEmpty({ message: 'El campo orden de producción es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo orden de producción debe ser de tipo número' },
  )
  productionOrder: number;

  @IsNotEmpty({ message: 'El campo código prenda es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({
    message: 'El campo código prenda debe ser un identificador válido',
  })
  garmentCode: Types.ObjectId;

  @IsNotEmpty({ message: 'El campo trazo es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo trazo debe ser de tipo número' },
  )
  streak: number;

  @IsNotEmpty({ message: 'El campo capas es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo capas debe ser de tipo número' },
  )
  layers: number;

  @IsNotEmpty({ message: 'El campo largo trazo es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo largo trazo debe ser de tipo número' },
  )
  longStroke: number;

  @IsNotEmpty({ message: 'El campo unidades por capa es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo unidades por capa debe ser de tipo número' },
  )
  unitsPerLayer: number;

  @IsNotEmpty({ message: 'El campo inicio del corte es requerido' })
  @IsString({ message: 'El campo inicio del corte debe ser de tipo texto' })
  initCutter: string;

  @IsNotEmpty({ message: 'El campo fin del corte es requerido' })
  @IsString({ message: 'El campo fin del corte debe ser de tipo texto' })
  endCutter: string;

  @IsNotEmpty({ message: 'El campo operación es requerido' })
  @IsString({ message: 'El campo operación debe ser de tipo texto' })
  operation: string;

  @IsNotEmpty({ message: 'El campo operador es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({ message: 'El campo operador debe ser un identificador válido' })
  operator: Types.ObjectId;
}
