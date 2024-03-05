import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import moment from 'moment';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true, transform: schemaTransform },
    strict: true
})
export class MobileStore {
    @Prop({ type: String, required: true })
    mobile_code: number;

    @Prop({ type: String, required: true })
    mobile_number: number;

    @Prop({ type: Boolean, required: true, default: false })
    is_verified: boolean;

    @Prop({ type: Number, required: true })
    @Exclude()
    otp: number;

    @Prop({ type: String, required: true })
    uuid: string;

    @Prop({ type: Date, default: Date.now, expires: '10m' }) // expires after 5 minutes
    expires_at: Date;
}

export const mobileStoreSchema = SchemaFactory.createForClass(MobileStore);

mobileStoreSchema.index({ mobile_code: 1, mobile_number: 1 }, { unique: true });

function schemaTransform(doc, ret) {
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.__v;
    delete ret._id;
    delete ret.code;
    return ret;
}