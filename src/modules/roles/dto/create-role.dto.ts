import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'El nombre del rol es requerido' })
  @IsString({ message: 'El nombre del rol debe ser tipo string' })
  @MinLength(3)
  name: string;

  @IsNotEmpty({ message: 'El campo isActive es requerido' })
  @IsBoolean({ message: 'El campo isActive debe ser tipo boolean' })
  isActive: boolean;
}
