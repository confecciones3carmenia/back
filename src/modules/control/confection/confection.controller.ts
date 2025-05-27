import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfectionService } from './confection.service';
import { CreateConfectionDto } from './dto/create-confection.dto';
import { UpdateConfectionDto } from './dto/update-confection.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('confection')
export class ConfectionController {
  constructor(private readonly confectionService: ConfectionService) {}

  @Post()
  create(@Body() createConfectionDto: CreateConfectionDto) {
    return this.confectionService.create(createConfectionDto);
  }

  @Post('many')
  createMany(@Body() createConfectionDto: Array<CreateConfectionDto>) {
    return this.confectionService.createMany(createConfectionDto);
  }

  @Get()
  findAll() {
    return this.confectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.confectionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateConfectionDto: UpdateConfectionDto,
  ) {
    return this.confectionService.update(id, updateConfectionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.confectionService.remove(id);
  }
}
