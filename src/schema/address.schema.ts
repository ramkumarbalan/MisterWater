import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Address {
  @Prop({ type: String })
  addressLine1: string;

  @Prop({ type: String })
  addressLine2: string;

  @Prop({ type: String })
  doorNo: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: Number })
  pincode: number;

  @Prop({ type: Boolean, default: false })
  isApproved: boolean;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const addressSchema = SchemaFactory.createForClass(Address);
