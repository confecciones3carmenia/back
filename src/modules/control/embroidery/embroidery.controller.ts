import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmbroideryService } from './embroidery.service';
import { CreateEmbroideryDto } from './dto/create-embroidery.dto';
import { UpdateEmbroideryDto } from './dto/update-embroidery.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('embroidery')
export class EmbroideryController {
  constructor(private readonly embroideryService: EmbroideryService) {}

  @Post()
  create(@Body() createEmbroideryDto: CreateEmbroideryDto) {
    return this.embroideryService.create(createEmbroideryDto);
  }

  @Get()
  findAll() {
    return this.embroideryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.embroideryService.findOne(id);
  }

  @Get('by-user/:id')
  findByUser(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.embroideryService.findByUser(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateEmbroideryDto: UpdateEmbroideryDto,
  ) {
    console.log('lo que llega el body', updateEmbroideryDto);
    console.log('lo que llega el id', id);
    return this.embroideryService.update(id, updateEmbroideryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.embroideryService.remove(id);
  }
}
