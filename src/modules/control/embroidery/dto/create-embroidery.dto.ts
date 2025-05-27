import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateEmbroideryDto {
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

  @IsNotEmpty({ message: 'El campo inicio del bordado es requerido' })
  @IsString({ message: 'El campo inicio del bordado debe ser de tipo texto' })
  initEmbroidery: string;

  @IsNotEmpty({ message: 'El campo fin del bordado es requerido' })
  @IsString({ message: 'El campo fin del bordado debe ser de tipo texto' })
  endEmbroidery: string;

  @IsNotEmpty({ message: 'El campo tipo de bordado es requerido' })
  @IsString({ message: 'El campo tipo de bordado debe ser de tipo texto' })
  embroideryType: string;

  @IsNotEmpty({ message: 'El campo cabezas utilizadas es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo cabezas utilizadas debe ser de tipo número' },
  )
  usedHeaders: number;

  @IsNotEmpty({ message: 'El campo talla es requerido' })
  @IsString({ message: 'El campo talla debe ser de tipo texto' })
  size: string;

  @IsNotEmpty({ message: 'El campo cantidad es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo cantidad debe ser de tipo número' },
  )
  quantity: number;

  @IsNotEmpty({ message: 'El campo operador es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({
    message: 'El campo operador debe ser un identificador válido',
  })
  operator: Types.ObjectId;
}
