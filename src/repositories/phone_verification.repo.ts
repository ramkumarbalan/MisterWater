import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneVerfication } from 'src/schema/verification.schema';
import { generateRandomOTP } from 'src/utility/util';

@Injectable()
export class PhoneVerificationRepo {
    constructor(
        @InjectModel(PhoneVerfication.name) private readonly phoneVerficationModel: Model<PhoneVerfication>
    ) { }

    async verifyPhone(code: number, uuid: string) {
        return await this.phoneVerficationModel.findOneAndUpdate(
            { uuid: uuid, code: code },
            { $set: { 'isVerified': true } },
            { new: true },
        );
    }

    async findPhone(phone) {
        return await this.phoneVerficationModel.findOne(
            { mobile_number: phone }
        );
    }

    async createPhone(payload) {
        return await new this.phoneVerficationModel(payload).save().then((data) => {
            return data;
        });
    }

    async findUUID(uuid) {
        return await this.phoneVerficationModel.findOne(
            { uuid: uuid }
        );
    }
}
