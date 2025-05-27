import { Injectable } from '@nestjs/common';
import { CreateConfectionDto } from './dto/create-confection.dto';
import { UpdateConfectionDto } from './dto/update-confection.dto';
import { Confection } from './entities/confection.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConfectionService {
  constructor(
    @InjectModel('Confection')
    private readonly confectionModel: Model<Confection>,
  ) {}

  async create(createConfectionDto: CreateConfectionDto) {
    return await this.confectionModel.create(createConfectionDto);
  }

  async createMany(
    createConfectionDto: Array<CreateConfectionDto>,
  ): Promise<Array<Confection>> {
    const result = await this.confectionModel.insertMany(createConfectionDto);
    return result.map((doc) => doc.toObject() as Confection);
  }

  async findAll() {
    return await this.confectionModel
      .find()
      .populate('garmentCode', 'name')
      .populate('operation', 'name')
      .populate('operator', 'name lastname');
  }

  async findOne(id: Types.ObjectId) {
    return await this.confectionModel.findById(id);
  }

  async update(id: Types.ObjectId, updateConfectionDto: UpdateConfectionDto) {
    return await this.confectionModel.findByIdAndUpdate(
      id,
      updateConfectionDto,
    );
  }

  async remove(id: Types.ObjectId) {
    return await this.confectionModel.findByIdAndDelete(id);
  }
}
