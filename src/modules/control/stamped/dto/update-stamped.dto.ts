import { PartialType } from '@nestjs/mapped-types';
import { CreateStampedDto } from './create-stamped.dto';

export class UpdateStampedDto extends PartialType(CreateStampedDto) {}
