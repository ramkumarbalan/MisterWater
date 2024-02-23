import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from 'src/schema/address.schema';

@Injectable()
export class AddressRepo {
  constructor(
    @InjectModel(Address.name) private readonly addressModel: Model<Address>,
  ) {}

  async create(payload: any) {
    return await new this.addressModel(payload).save();
  }

  async findById(id: string) {
    return await this.addressModel.findById(id);
  }
}
