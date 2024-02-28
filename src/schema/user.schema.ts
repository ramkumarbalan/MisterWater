import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, addressSchema } from './address.schema';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
})
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  mobile_code: number;

  @Prop({ type: String, required: true })
  mobile_number: number;

  @Prop({
    type: String,
    enum: ['customer', 'vendor', 'shipper', 'admin'],
    default: 'customer',
    required: true,
  })
  role: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop([{ type: addressSchema }])
  addresses: Address[];

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.index({ mobile_code: 1, mobile_number: 1 }, { unique: true });

function schemaTransform(doc, ret) {
  delete ret.updatedAt;
  delete ret.createdAt;
  delete ret.__v;
  delete ret._id;
  delete ret.role;
  delete ret.isActive;
  return ret;
}
