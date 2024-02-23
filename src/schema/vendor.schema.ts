import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';
import { generateRandomOTP } from 'src/utility/util';
import { Address, addressSchema } from './address.schema';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
})
export class Vendor {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Number })
  code: number;

  @Prop({ type: String })
  shopName: string;

  @Prop({ type: Boolean, default: false })
  isApproved: boolean;

  @Prop({ type: Boolean, default: false })
  isActive: boolean;

  @Prop([{ type: addressSchema }])
  addresses: Address[];

  @Prop()
  users: [
    {
      isApproved: { type: boolean; defalut: false };
      isActive: { type: boolean; defalut: false };
      user: { type: Types.ObjectId; ref: 'User' };
    },
  ];
}

export const vendorSchema = SchemaFactory.createForClass(Vendor);

vendorSchema.pre('save', function (next) {
  this.code = generateRandomOTP();
  next();
});

function schemaTransform(doc, ret) {
  delete ret.__v;
  delete ret._id;
  delete ret.isActive;
  delete ret.isApproved;
  return ret;
}
