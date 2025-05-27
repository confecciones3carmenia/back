import { PartialType } from '@nestjs/mapped-types';
import { CreateCuttingDto } from './create-cutting.dto';

export class UpdateCuttingDto extends PartialType(CreateCuttingDto) {}
