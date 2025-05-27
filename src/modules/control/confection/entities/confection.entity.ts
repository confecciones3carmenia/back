import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Garment } from 'src/modules/garments/entities/garment.entity';
import { Operation } from 'src/modules/resources/operations/entities/operation.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ collection: 'confectionControl', timestamps: true })
export class Confection extends Document {
  @Prop({ required: true })
  operationOrder: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment',
    required: true,
  })
  garmentCode: Garment;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operation',
    required: true,
  })
  operation: Operation;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  operator: User;

  @Prop({ required: true })
  units: number;

  @Prop({ required: true })
  initConfection: string;

  @Prop({ required: true })
  endConfection: string;

  @Prop({ required: true })
  estimatedTime: number;

  @Prop({ required: true })
  discountTime: number;

  @Prop({ required: true })
  realWorkTime: number;

  @Prop({ required: true })
  efficiency: string;
}

export const ConfectionSchema = SchemaFactory.createForClass(Confection);
