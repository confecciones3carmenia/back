import { Injectable } from '@nestjs/common';
import { CreateStampedDto } from './dto/create-stamped.dto';
import { UpdateStampedDto } from './dto/update-stamped.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Stamped } from './entities/stamped.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class StampedService {
  constructor(
    @InjectModel(Stamped.name)
    private readonly stampedModel: Model<Stamped>,
  ) {}
  async create(createStampedDto: CreateStampedDto) {
    return await this.stampedModel.create(createStampedDto);
  }

  async findAll() {
    return await this.stampedModel
      .find()
      .limit(100)
      .populate('garmentCode', 'code')
      .populate('operator', 'name lastname');
  }

  async findByUser(userId: Types.ObjectId) {
    return await this.stampedModel
      .find({ user: userId })
      .populate('operator', 'name lastname')
      .populate('garmentCode', 'code');
  }

  async findOne(id: Types.ObjectId) {
    return await this.stampedModel.findById(id);
  }

  async update(id: Types.ObjectId, updateStampedDto: UpdateStampedDto) {
    return this.stampedModel.findByIdAndUpdate(id, updateStampedDto);
  }

  async remove(id: Types.ObjectId) {
    return await this.stampedModel.findByIdAndDelete(id);
  }
}
