import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { generateRandomOTP } from 'src/utility/util';

@Schema({
    timestamps: true,
    toJSON: { virtuals: true, transform: schemaTransform }
})
export class PhoneVerfication {
    @Prop({ type: String, required: true })
    mobile_code: number;

    @Prop({ type: String, required: true })
    mobile_number: number;

    @Prop({ type: Boolean, required: true, default: false })
    isVerified: boolean;

    @Prop({ type: Number, required: true })
    @Exclude()
    code: number;

    @Prop({ type: String, required: true })
    uuid: string;
}

export const phoneVerficationSchema = SchemaFactory.createForClass(PhoneVerfication);

phoneVerficationSchema.index({ mobile_code: 1, mobile_number: 1 }, { unique: true });

function schemaTransform(doc, ret) {
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.__v;
    delete ret._id;
    delete ret.code;
    return ret;
}