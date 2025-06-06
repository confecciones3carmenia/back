import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GarmentsService } from './garments.service';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('garments')
export class GarmentsController {
  constructor(private readonly garmentsService: GarmentsService) {}

  @Post()
  create(@Body() createGarmentDto: CreateGarmentDto) {
    return this.garmentsService.create(createGarmentDto);
  }

  @Post('bulk')
  createMany(@Body() createGarmentDto: CreateGarmentDto[]) {
    return this.garmentsService.createMany(createGarmentDto);
  }

  @Get()
  findAll() {
    return this.garmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.garmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateGarmentDto: UpdateGarmentDto,
  ) {
    return this.garmentsService.update(id, updateGarmentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.garmentsService.remove(id);
  }
}
