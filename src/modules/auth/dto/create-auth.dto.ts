import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { isMongoObjectId } from 'src/common/decorators/is-mongo-object-id.decorator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  @IsString({ message: 'El nombre de usuario debe ser string' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener mas de 3 caracteres',
  })
  userName: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsString({ message: 'La contraseña debe ser tipo string' })
  @MinLength(6, { message: 'La contraseña debe tener mas de 6 caracteres' })
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, una minúscula y un número.',
  })
  password: string;

  @IsNotEmpty({ message: 'El correo es requerido' })
  @IsEmail()
  email: string;

  @IsOptional()
  @Transform(isMongoObjectId)
  user: Types.ObjectId;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
