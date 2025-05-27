import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StampedService } from './stamped.service';
import { CreateStampedDto } from './dto/create-stamped.dto';
import { UpdateStampedDto } from './dto/update-stamped.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('stamped')
export class StampedController {
  constructor(private readonly stampedService: StampedService) {}

  @Post()
  create(@Body() createStampedDto: CreateStampedDto) {
    return this.stampedService.create(createStampedDto);
  }

  @Get()
  findAll() {
    return this.stampedService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.stampedService.findOne(id);
  }

  @Get('by-user/:id')
  findByUser(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.stampedService.findByUser(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateStampedDto: UpdateStampedDto,
  ) {
    return this.stampedService.update(id, updateStampedDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.stampedService.remove(id);
  }
}
