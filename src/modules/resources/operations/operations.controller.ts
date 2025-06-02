import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('operations')
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
  create(@Body() createOperationDto: CreateOperationDto) {
    return this.operationsService.create(createOperationDto);
  }

  @Post('bulk')
  createMany(@Body() createOperationDto: CreateOperationDto[]) {
    return this.operationsService.createMany(createOperationDto);
  }

  @Get()
  findAll() {
    return this.operationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.operationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.update(id, updateOperationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.operationsService.remove(id);
  }
}
