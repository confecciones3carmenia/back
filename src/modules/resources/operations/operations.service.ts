import { Injectable } from '@nestjs/common';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Operation } from './entities/operation.entity';

@Injectable()
export class OperationsService {
  constructor(
    @InjectModel(Operation.name)
    private readonly operationModel: Model<Operation>,
  ) {}
  async create(createOperationDto: CreateOperationDto) {
    return await this.operationModel.create(createOperationDto);
  }

  async createMany(createOperationDto: CreateOperationDto[]) {
    const seenCodes = new Set<string>();
    const uniqueOperations: CreateOperationDto[] = [];

    for (const dto of createOperationDto) {
      if (dto.code && !seenCodes.has(dto.code)) {
        seenCodes.add(dto.code);
        uniqueOperations.push(dto);
      }
    }

    if (uniqueOperations.length === 0) {
      return [];
    }

    return await this.operationModel.insertMany(uniqueOperations);
  }

  async findAll() {
    return await this.operationModel.find();
  }

  async findOne(id: Types.ObjectId) {
    return await this.operationModel.findById(id);
  }

  async update(id: Types.ObjectId, updateOperationDto: UpdateOperationDto) {
    return await this.operationModel.findByIdAndUpdate(id, updateOperationDto);
  }

  async remove(id: Types.ObjectId) {
    return await this.operationModel.findByIdAndDelete(id);
  }
}
