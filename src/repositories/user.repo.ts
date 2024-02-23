import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { generateRandomOTP } from 'src/utility/util';

@Injectable()
export class UserRepo {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(payload: any) {
    return await new this.userModel(payload).save().then((data) => {
      return data;
    });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async requestOtp(mobile_code: number, mobile_number: number) {
    return await this.userModel.findOneAndUpdate(
      { mobile_code, mobile_number },
      {
        $set: {
          'validation.code': generateRandomOTP(),
          'validation.isVerified': false,
        },
      },
    );
  }

  async verifyPhone(id: string, code: number) {
    return await this.userModel.findOneAndUpdate(
      { _id: id, 'validation.code': code },
      { $set: { 'validation.isVerified': true } },
      { new: true },
    );
  }

  async isPhoneVerified(id: string) {
    return await this.userModel.findOne({
      _id: id,
      'validation.isVerified': true,
    });
  }
}
