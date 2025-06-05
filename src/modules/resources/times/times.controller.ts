import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { TimesService } from './times.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('times')
export class TimesController {
  constructor(private readonly timesService: TimesService) {}

  @Post()
  create(@Body() createTimeDto: CreateTimeDto) {
    return this.timesService.create(createTimeDto);
  }

  @Post('bulk')
  bulkCreate(
    @Body(new ValidationPipe({ transform: true }))
    createTimeDtos: CreateTimeDto[],
  ) {
    return this.timesService.bulkCreate(createTimeDtos);
  }

  @Get()
  findAll() {
    return this.timesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.timesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateTimeDto: UpdateTimeDto,
  ) {
    return this.timesService.update(id, updateTimeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.timesService.remove(id);
  }
}
