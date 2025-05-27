import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'operations', timestamps: true })
export class Operation extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);
