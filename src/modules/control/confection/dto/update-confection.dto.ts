import { PartialType } from '@nestjs/mapped-types';
import { CreateConfectionDto } from './create-confection.dto';

export class UpdateConfectionDto extends PartialType(CreateConfectionDto) {}
