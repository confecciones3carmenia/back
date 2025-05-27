import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/modules/users/entities/user.entity';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth extends Document {
  @Prop({
    index: true,
    required: true,
  })
  userName: string;

  @Prop({
    required: true,
    minlength: 6,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    minlength: 6,
  })
  email: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({
    required: true,
    default: true,
  })
  isActive: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
