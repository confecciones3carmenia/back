import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Garment } from 'src/modules/garments/entities/garment.entity';
import { Operation } from 'src/modules/resources/operations/entities/operation.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ collection: 'cuttingControl', timestamps: true })
export class Cutting extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  operationOrder: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment',
    required: true,
  })
  garmentCode: Garment;

  @Prop({ required: true })
  streak: number;

  @Prop({ required: true })
  layers: number;

  @Prop({ required: true })
  longStroke: number;

  @Prop({ required: true })
  unitsPerLayer: number;

  @Prop({ required: true })
  initCutter: string;

  @Prop({ required: true })
  endCutter: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operation',
    required: true,
  })
  operation: Operation;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  operator: User;
}

export const CuttingSchema = SchemaFactory.createForClass(Cutting);
