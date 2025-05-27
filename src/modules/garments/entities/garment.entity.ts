import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'garments', timestamps: true })
export class Garment extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;
}

export const GarmentSchema = SchemaFactory.createForClass(Garment);
