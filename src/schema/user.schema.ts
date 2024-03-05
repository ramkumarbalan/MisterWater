import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Schema as mongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
  strict: true
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

  @Prop([{ type: [mongooseSchema.Types.Mixed] }])
  addresses: [{
    address: { type: Types.ObjectId, ref: 'CommunityMaster' },
    building_name: string,
    type: { type: string, default: 'home' }
    door_no: string,
    is_deleted: { type: boolean, default: false }
  }];

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Boolean, default: false })
  is_delete: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.index({ mobile_code: 1, mobile_number: 1 }, { unique: true });

function schemaTransform(doc, ret) {
  delete ret.updatedAt;
  delete ret.createdAt;
  delete ret.__v;
  delete ret._id;
  delete ret.role;
  delete ret.is_active;
  return ret;
}
