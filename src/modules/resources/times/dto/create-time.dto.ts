import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateTimeDto {
  @IsNotEmpty({ message: 'La operación es requerida' })
  @Transform(isMongoObjectId)
  operation: Types.ObjectId;

  @IsNotEmpty({ message: 'El tiempo estándar es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El tiempo estándar debe ser un número' },
  )
  standardTime: number;

  @IsOptional()
  @IsNumber(
    { allowNaN: false },
    { message: 'La referencia estándar debe ser un número' },
  )
  standardReference: number;

  @IsNotEmpty({ message: 'La prenda es requerida' })
  @Transform(isMongoObjectId)
  garment: Types.ObjectId;
}
