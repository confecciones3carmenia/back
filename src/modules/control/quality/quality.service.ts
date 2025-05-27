import { Injectable } from '@nestjs/common';
import { CreateQualityDto } from './dto/create-quality.dto';
import { UpdateQualityDto } from './dto/update-quality.dto';
import { Quality } from './entities/quality.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class QualityService {
  constructor(
    @InjectModel(Quality.name) private readonly qualityModel: Model<Quality>,
  ) {}
  async create(createQualityDto: CreateQualityDto) {
    return await this.qualityModel.create(createQualityDto);
  }

  async findAll() {
    return await this.qualityModel
      .find()
      .limit(100)
      .populate('operator', 'name lastname')
      .populate('garmentCode', 'code');
  }

  async findOne(id: Types.ObjectId) {
    return await this.qualityModel.findById(id);
  }

  async update(id: Types.ObjectId, updateQualityDto: UpdateQualityDto) {
    return await this.qualityModel.findByIdAndUpdate(id, updateQualityDto);
  }

  async remove(id: Types.ObjectId) {
    return await this.qualityModel.findByIdAndDelete(id);
  }
}
