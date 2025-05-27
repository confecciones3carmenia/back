import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  position: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
    required: false,
  })
  authInfo: Auth;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
