import { Injectable } from '@nestjs/common';
import { CreateCuttingDto } from './dto/create-cutting.dto';
import { UpdateCuttingDto } from './dto/update-cutting.dto';
import { Cutting } from './entities/cutting.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CuttingService {
  constructor(
    @InjectModel(Cutting.name) private readonly cuttingModel: Model<Cutting>,
  ) {}

  async create(createCuttingDto: CreateCuttingDto) {
    return await this.cuttingModel.create(createCuttingDto);
  }

  async findAll() {
    return await this.cuttingModel
      .find()
      .limit(100)
      .populate('operator', 'name lastname')
      .populate('garmentCode', 'code');
  }

  async findByUser(userId: Types.ObjectId) {
    return await this.cuttingModel
      .find({ user: userId })
      .populate('operator', 'name');
  }

  async findOne(id: Types.ObjectId) {
    return await this.cuttingModel.findById(id);
  }

  async update(id: Types.ObjectId, updateCuttingDto: UpdateCuttingDto) {
    return await this.cuttingModel.findByIdAndUpdate(id, updateCuttingDto);
  }

  async remove(id: Types.ObjectId) {
    return await this.cuttingModel.findByIdAndDelete(id);
  }
}
