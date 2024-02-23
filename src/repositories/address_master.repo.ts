import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationFilter } from 'src/utility/common/PaginationFilter';
import { AddressMaster } from 'src/schema/address-master.schema';

@Injectable()
export class AddressMasterRepo {
  constructor(
    @InjectModel(AddressMaster.name)
    private readonly addressMasterModel: Model<AddressMaster>,
  ) {}

  async create(payload: any) {
    return await new this.addressMasterModel(payload).save();
  }

  async update(id: string, payload: any) {
    return await this.addressMasterModel.findByIdAndUpdate(id, payload).exec();
  }

  async findAll(paginationFilter: PaginationFilter) {
    const { limit, page } = paginationFilter;
    const matchQuery = {};
    if (paginationFilter.search) {
      matchQuery['communityName'] = {
        $regex: paginationFilter.search,
        $options: 'i',
      };
    }
    return await this.addressMasterModel
      .aggregate([
        {
          $match: matchQuery,
        },
        {
          $facet: {
            addressess: [
              { $skip: page * limit - limit },
              { $limit: limit },
              { $sort: { communityName: 1 } },
            ],
            total: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ])
      .then((data) => {
        return data[0];
      });
  }

  async findById(id) {
    return await this.addressMasterModel.findById(id).exec();
  }
}
