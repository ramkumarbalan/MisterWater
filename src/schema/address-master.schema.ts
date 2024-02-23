import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address } from './address.schema';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true, transform: schemaTransform },
})
export class AddressMaster {
  @Prop({ type: String, required: true })
  communityName: string;

  @Prop()
  buildings: [
    {
      name: { type: string; required: true };
      doorNo: [string];
    },
  ];

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: Number, required: true })
  pincode: number;
}

export const addressMasterSchema = SchemaFactory.createForClass(AddressMaster);

addressMasterSchema.index(
  { communityName: 1, city: 1, state: 1, pincode: 1 },
  { unique: true },
);

function schemaTransform(doc, ret) {
  delete ret.__v;
  delete ret._id;
  return ret;
}
