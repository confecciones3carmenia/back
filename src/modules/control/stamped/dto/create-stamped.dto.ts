import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateStampedDto {
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

  @IsNotEmpty({ message: 'El campo pieza fusión es requerido' })
  @IsString({ message: 'El campo pieza fusión debe ser de tipo texto' })
  fusedPiece: string;

  @IsNotEmpty({ message: 'El campo unidades por placa es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo unidades por placa debe ser de tipo número' },
  )
  unitPerPlate: number;

  @IsNotEmpty({ message: 'El campo cantidad es requerido' })
  @IsNumber(
    { allowNaN: false },
    { message: 'El campo cantidad debe ser de tipo número' },
  )
  quantity: number;

  @IsNotEmpty({ message: 'El campo inicio del estampado es requerido' })
  @IsString({ message: 'El campo inicio del estampado debe ser de tipo texto' })
  initStamped: string;

  @IsNotEmpty({ message: 'El campo fin del estampado es requerido' })
  @IsString({ message: 'El campo fin del estampado debe ser de tipo texto' })
  endStamped: string;

  @IsNotEmpty({ message: 'El campo operador es requerido' })
  @Transform(isMongoObjectId)
  @IsMongoId({
    message: 'El campo operador debe ser un identificador válido',
  })
  operator: Types.ObjectId;
}
