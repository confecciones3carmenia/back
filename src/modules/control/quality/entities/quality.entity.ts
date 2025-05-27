import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Garment } from 'src/modules/garments/entities/garment.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ collection: 'qualityControl', timestamps: true })
export class Quality extends Document {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  productionOrder: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garment',
    required: true,
  })
  garmentCode: Garment;

  @Prop({ required: true })
  operation: string;

  @Prop({ required: true })
  unitsChecked: number;

  @Prop({ required: true })
  initQuality: string;

  @Prop({ required: true })
  endQuality: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  operator: User;
}

export const QualitySchema = SchemaFactory.createForClass(Quality);
