import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QualityService } from './quality.service';
import { CreateQualityDto } from './dto/create-quality.dto';
import { UpdateQualityDto } from './dto/update-quality.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('quality')
export class QualityController {
  constructor(private readonly qualityService: QualityService) {}

  @Post()
  create(@Body() createQualityDto: CreateQualityDto) {
    return this.qualityService.create(createQualityDto);
  }

  @Get()
  findAll() {
    return this.qualityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.qualityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateQualityDto: UpdateQualityDto,
  ) {
    return this.qualityService.update(id, updateQualityDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.qualityService.remove(id);
  }
}
