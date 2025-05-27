import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateQualityDto {
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

  @IsNotEmpty({ message: 'El campo operación es requerido' })
  @IsString({ message: 'El campo operación debe ser de tipo texto' })
  operation: string;

  @IsNotEmpty({ message: 'El campo unidades revisadas es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo unidades revisadas debe ser de tipo número' },
  )
  unitsChecked: number;

  @IsNotEmpty({ message: 'El campo inicio de calidad es requerido' })
  @IsString({ message: 'El campo inicio de calidad debe ser de tipo texto' })
  initQuality: string;

  @IsNotEmpty({ message: 'El campo fin de calidad es requerido' })
  @IsString({ message: 'El campo fin de calidad debe ser de tipo texto' })
  endQuality: string;

  @IsNotEmpty({ message: 'El campo operador es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({
    message: 'El campo operador debe ser un identificador válido',
  })
  operator: Types.ObjectId;
}
