import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ default: true, required: true })
  isActive: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
