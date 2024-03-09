import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MobileStore } from 'src/schema/mobile_store.schema';

@Injectable()
export class MobileStoreRepo {
  constructor(
    @InjectModel(MobileStore.name)
    private readonly mobileStoreModel: Model<MobileStore>,
  ) {}

  async validateOtp(code: number, uuid: string) {
    return await this.mobileStoreModel.findOneAndUpdate(
      { uuid: uuid, otp: code },
      { $set: { is_verified: true } },
      { new: true },
    );
  }

  async findPhone(payload) {
    const { mobile_code, mobile_number } = payload;
    return await this.mobileStoreModel.findOne({ mobile_code, mobile_number });
  }

  async create(payload) {
    return await new this.mobileStoreModel(payload).save().then((data) => {
      return data;
    });
  }

  async findUUID(uuid) {
    return await this.mobileStoreModel.findOne({ uuid: uuid });
  }
}
