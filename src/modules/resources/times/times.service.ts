import { Injectable } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Time } from './entities/time.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class TimesService {
  constructor(
    @InjectModel(Time.name) private readonly timeModel: Model<Time>,
  ) {}
  async create(createTimeDto: CreateTimeDto) {
    return await this.timeModel.create(createTimeDto);
  }

  async findAll() {
    return await this.timeModel
      .find()
      .populate('operation', 'code')
      .populate('garment', 'code');
  }

  async findOne(id: Types.ObjectId) {
    return await this.timeModel.findById(id);
  }

  async update(id: Types.ObjectId, updateTimeDto: UpdateTimeDto) {
    return await this.timeModel.findByIdAndUpdate(id, updateTimeDto);
  }

  async remove(id: Types.ObjectId) {
    return await this.timeModel.findByIdAndDelete(id);
  }
}
