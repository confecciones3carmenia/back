import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Garment } from 'src/modules/garments/entities/garment.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Schema({ collection: 'stampedControl', timestamps: true })
export class Stamped extends Document {
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
  fusedPiece: string;

  @Prop({ required: true })
  unitPerPlate: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  initStamped: string;

  @Prop({ required: true })
  endStamped: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  operator: User;
}

export const StampedSchema = SchemaFactory.createForClass(Stamped);
