import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CuttingService } from './cutting.service';
import { CreateCuttingDto } from './dto/create-cutting.dto';
import { UpdateCuttingDto } from './dto/update-cutting.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('cutting')
export class CuttingController {
  constructor(private readonly cuttingService: CuttingService) {}

  @Post()
  create(@Body() createCuttingDto: CreateCuttingDto) {
    return this.cuttingService.create(createCuttingDto);
  }

  @Get()
  findAll() {
    return this.cuttingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.cuttingService.findOne(id);
  }

  @Get('by-user/:id')
  findByUser(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.cuttingService.findByUser(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateCuttingDto: UpdateCuttingDto,
  ) {
    return this.cuttingService.update(id, updateCuttingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.cuttingService.remove(id);
  }
}
