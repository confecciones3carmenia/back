import { PartialType } from '@nestjs/mapped-types';
import { CreateEmbroideryDto } from './create-embroidery.dto';

export class UpdateEmbroideryDto extends PartialType(CreateEmbroideryDto) {}
