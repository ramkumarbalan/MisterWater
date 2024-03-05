import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import { generateRandomOTP } from 'src/utility/util';
import { Types, Schema as mongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
  strict: true
})
export class Vendor {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: String })
  shop_name: string;

  @Prop({ type: String })
  shop_address: string;

  @Prop({ type: Number })
  shop_code: number;

  @Prop({ type: Boolean, default: false })
  is_active: boolean;

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean;

  @Prop([{ type: [mongooseSchema.Types.Mixed] }])
  addresses: [{
    address: { type: Types.ObjectId, ref: 'CommunityMaster' },
    is_deleted: { type: boolean, default: false }
    is_active: boolean;
  }];

  @Prop({ type: [mongooseSchema.Types.Mixed] })
  serviceable_time: [{
    start: string,
    end: string,
    is_deleted: { type: boolean, default: false }
    is_active: boolean;
  }];
}

export const vendorSchema = SchemaFactory.createForClass(Vendor);

vendorSchema.pre('save', function (next) {
  this.shop_code = generateRandomOTP();
  next();
});

function schemaTransform(doc, ret) {
  delete ret.__v;
  delete ret._id;
  delete ret.isActive;
  delete ret.isApproved;
  return ret;
}
