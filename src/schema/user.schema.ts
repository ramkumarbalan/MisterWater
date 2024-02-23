import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, addressSchema } from './address.schema';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { Exclude } from 'class-transformer';
import { generateRandomOTP } from 'src/utility/util';

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

  @Prop({ type: String, required: false })
  email: string;

  @Prop([{ type: addressSchema }])
  addresses: Address[];

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: MongooseSchema.Types.Mixed })
  @Exclude()
  validation: {
    code: number;
    isVerified: boolean;
  };

  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.index({ mobile_code: 1, mobile_number: 1 }, { unique: true });

userSchema.pre('save', function (next) {
  if (!this.validation) {
    this.validation = {
      code: generateRandomOTP(),
      isVerified: false,
    };
  }
  next();
});

function schemaTransform(doc, ret) {
  delete ret.updatedAt;
  delete ret.createdAt;
  delete ret.__v;
  delete ret._id;
  delete ret.role;
  delete ret.validation;
  delete ret.isActive;
  return ret;
}
