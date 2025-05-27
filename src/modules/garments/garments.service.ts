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
  create(createGarmentDto: CreateGarmentDto) {
    return this.garmentModel.create(createGarmentDto);
  }

  findAll() {
    return this.garmentModel.find();
  }

  findOne(id: Types.ObjectId) {
    return this.garmentModel.findById(id);
  }

  update(id: Types.ObjectId, updateGarmentDto: UpdateGarmentDto) {
    return this.garmentModel.findByIdAndUpdate(id, updateGarmentDto);
  }

  remove(id: Types.ObjectId) {
    return this.garmentModel.findByIdAndDelete(id);
  }
}
