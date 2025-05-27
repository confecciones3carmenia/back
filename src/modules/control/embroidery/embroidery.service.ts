import { Injectable } from '@nestjs/common';
import { CreateEmbroideryDto } from './dto/create-embroidery.dto';
import { UpdateEmbroideryDto } from './dto/update-embroidery.dto';
import { Embroidery } from './entities/embroidery.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class EmbroideryService {
  constructor(
    @InjectModel(Embroidery.name)
    private readonly embroideryModel: Model<Embroidery>,
  ) {}

  async create(createEmbroideryDto: CreateEmbroideryDto) {
    return await this.embroideryModel.create(createEmbroideryDto);
  }

  async findAll() {
    return await this.embroideryModel
      .find()
      .limit(100)
      .populate('operator', 'name lastname')
      .populate('garmentCode', 'code');
  }

  async findByUser(userId: Types.ObjectId) {
    return await this.embroideryModel
      .find({ user: userId })
      .populate('operator', 'name')
      .populate('garmentCode', 'code');
  }

  async findOne(id: Types.ObjectId) {
    return await this.embroideryModel.findById(id);
  }

  async update(id: Types.ObjectId, updateEmbroideryDto: UpdateEmbroideryDto) {
    return await this.embroideryModel.findByIdAndUpdate(
      id,
      updateEmbroideryDto,
    );
  }

  async remove(id: Types.ObjectId) {
    return await this.embroideryModel.findByIdAndDelete(id);
  }
}
