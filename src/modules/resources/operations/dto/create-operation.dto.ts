import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOperationDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  name: string;

  @IsNotEmpty({ message: 'La código es requerido' })
  @IsString({ message: 'El código debe ser un texto' })
  code: string;
}
