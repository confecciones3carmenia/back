import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un string' })
  name: string;

  @IsNotEmpty({ message: 'El apellido es requerido' })
  @IsString({ message: 'El apellido debe ser un string' })
  lastname: string;

  @IsNotEmpty({ message: 'El puesto es requerido' })
  @IsString({ message: 'El puesto debe ser un string' })
  position: string;

  @IsOptional()
  @Transform(isMongoObjectId)
  authInfo: Types.ObjectId;

  @IsNotEmpty({ message: 'El rol es requerido' })
  @Transform(isMongoObjectId)
  role: Types.ObjectId;
}
