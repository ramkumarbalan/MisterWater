import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as mongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
  strict: true,
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

  @Prop({ type: mongooseSchema.Types.Mixed, required: true })
  addresses: [
    {
      address: { type: Types.ObjectId; ref: 'CommunityMaster'; required: true };
      building_name: { type: string; required: true };
      type: { type: string; default: 'home'; required: true };
      door_no: { type: string; required: true };
      is_deleted: { type: boolean; default: false };
    },
  ];

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.index({ mobile_code: 1, mobile_number: 1 }, { unique: true });

function schemaTransform(doc, ret) {
  delete ret.updatedAt;
  delete ret.createdAt;
  delete ret.__v;
  delete ret.role;
  delete ret.is_active;
  delete ret.is_deleted;
  return ret;
}
