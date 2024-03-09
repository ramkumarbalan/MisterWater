import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import moment from 'moment';
import { generateRandomOTP } from 'src/shared/util';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
  strict: true,
})
export class MobileStore {
  @Prop({ type: String, required: true })
  mobile_code: number;

  @Prop({ type: String, required: true })
  mobile_number: number;

  @Prop({ type: Boolean, required: true, default: false })
  is_verified: boolean;

  @Prop({ type: Number })
  otp: number;

  @Prop({ type: String, required: true })
  uuid: string;

  @Prop({ type: Date, default: Date.now, expires: '10m' }) // expires after 5 minutes
  expires_at: Date;
}

export const mobileStoreSchema = SchemaFactory.createForClass(MobileStore);

mobileStoreSchema.index({ mobile_code: 1, mobile_number: 1 }, { unique: true });

mobileStoreSchema.pre('save', function (next) {
  this.otp = generateRandomOTP();
  next();
});

function schemaTransform(doc, ret) {
  delete ret.updatedAt;
  delete ret.createdAt;
  delete ret.__v;
  delete ret.otp;
  delete ret.expires_at;
  delete ret.is_verified;
  return ret;
}
