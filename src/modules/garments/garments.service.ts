import { Injectable } from '@nestjs/common';
import { CreateGarmentDto } from './dto/create-garment.dto';
import { UpdateGarmentDto } from './dto/update-garment.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Garment } from './entities/garment.entity';

@Injectable()
export class GarmentsService {
  constructor(
    @InjectModel(Garment.name) private readonly garmentModel: Model<Garment>,
  ) {}
  async create(createGarmentDto: CreateGarmentDto) {
    return await this.garmentModel.create(createGarmentDto);
  }

  async createMany(createGarmentDtos: CreateGarmentDto[]) {
    const seenCodes = new Set<string>();
    const uniqueGarments: CreateGarmentDto[] = [];

    for (const dto of createGarmentDtos) {
      if (dto.code && !seenCodes.has(dto.code)) {
        seenCodes.add(dto.code);
        uniqueGarments.push(dto);
      }
    }

    if (uniqueGarments.length === 0) {
      return [];
    }

    return await this.garmentModel.insertMany(uniqueGarments);
  }

  async findAll() {
    return await this.garmentModel.find();
  }

  async findOne(id: Types.ObjectId) {
    return await this.garmentModel.findById(id);
  }

  async update(id: Types.ObjectId, updateGarmentDto: UpdateGarmentDto) {
    return await this.garmentModel.findByIdAndUpdate(id, updateGarmentDto);
  }

  async remove(id: Types.ObjectId) {
    return await this.garmentModel.findByIdAndDelete(id);
  }
}
