import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobileStore } from 'src/schema/mobile_store.schema';

@Injectable()
export class MobileStoreRepo {
    constructor(
        @InjectModel(MobileStore.name) private readonly mobileStoreModel: Model<MobileStore>
    ) { }

    async verifyPhone(code: number, uuid: string) {
        return await this.mobileStoreModel.findOneAndUpdate(
            { uuid: uuid, otp: code },
            { $set: { 'isVerified': true } },
            { new: true },
        );
    }

    async findPhone(phone) {
        return await this.mobileStoreModel.findOne(
            { mobile_number: phone }
        );
    }

    async createPhone(payload) {
        return await new this.mobileStoreModel(payload).save().then((data) => {
            return data;
        });
    }

    async findUUID(uuid) {
        return await this.mobileStoreModel.findOne(
            { uuid: uuid }
        );
    }
}
