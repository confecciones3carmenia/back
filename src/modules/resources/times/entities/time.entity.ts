import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Operation } from '../../operations/entities/operation.entity';
import { Garment } from 'src/modules/garments/entities/garment.entity';

@Schema({ collection: 'times', timestamps: true })
export class Time extends Document {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operation',
    required: true,
  })
  operation: Operation;

  @Prop({ required: true })
  standardTime: number;

  @Prop({ required: false })
  standardReference: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment',
    required: true,
  })
  garment: Garment;
}

export const TimeSchema = SchemaFactory.createForClass(Time);
