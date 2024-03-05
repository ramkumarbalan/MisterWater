import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema} from 'mongoose';


@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
  strict: true
})
export class CommunityMaster {
  @Prop({ type: String, required: true })
  community_name: string;

  @Prop({ type: String, required: true })
  addressLine1: string;

  @Prop({ type: String, required: false })
  addressLine2: string;

  @Prop({ type: mongooseSchema.Types.Mixed, required: false })
  location: {
    type: string,
    coordinates: []
  };

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: Number, required: true })
  pincode: number;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Boolean, default: false })
  is_delete: boolean;
}

export const communityMasterSchema = SchemaFactory.createForClass(CommunityMaster);

communityMasterSchema.index(
  { communityName: 1, city: 1, state: 1, pincode: 1 },
  { unique: true },
);

function schemaTransform(doc, ret) {
  delete ret.__v;
  delete ret._id;
  return ret;
}
