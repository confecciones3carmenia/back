import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Garment } from 'src/modules/garments/entities/garment.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ collection: 'embroideryControl', timestamps: true })
export class Embroidery {
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
  initEmbroidery: string;

  @Prop({ required: true })
  endEmbroidery: string;

  @Prop({ required: true })
  embroideryType: string;

  @Prop({ required: true })
  usedHeaders: number;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  operator: User;
}

export const EmbroiderySchema = SchemaFactory.createForClass(Embroidery);
