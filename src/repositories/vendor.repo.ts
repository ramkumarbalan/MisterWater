import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from 'src/schema/vendor.schema';

@Injectable()
export class VendorRepo {
  constructor(
    @InjectModel(Vendor.name) private readonly vendorModel: Model<Vendor>,
  ) {}

  async create(payload: any) {
    return await new this.vendorModel(payload).save();
  }

  async update(id: string, payload: any) {
    return await this.vendorModel.findOneAndUpdate({
      user: id,
      $set: { payload },
    });
  }
}
