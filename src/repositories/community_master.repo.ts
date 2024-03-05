import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityMaster } from 'src/schema/community_master.schema';
import { PaginationFilter } from 'src/utility/common/PaginationFilter';

@Injectable()
export class CommunityMasterRepo {
  constructor(
    @InjectModel(CommunityMaster.name)
    private readonly communityMasterModel: Model<CommunityMaster>,
  ) {}

  async create(payload: any) {
    return await new this.communityMasterModel(payload).save();
  }

  async update(id: string, payload: any) {
    return await this.communityMasterModel.findByIdAndUpdate(id, payload).exec();
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
    return await this.communityMasterModel
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
    return await this.communityMasterModel.findById(id).exec();
  }
}
