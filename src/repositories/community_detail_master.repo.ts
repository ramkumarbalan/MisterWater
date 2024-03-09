import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommunityDetailMaster } from 'src/schema/community_detail.schema';

@Injectable()
export class CommunityDetailMasterRepo {
  constructor(
    @InjectModel(CommunityDetailMaster.name)
    private readonly communityDetailModel: Model<CommunityDetailMaster>,
  ) {}

  async create(payload: any) {
    return await new this.communityDetailModel(payload).save();
  }

  async findById(id: string) {
    return await this.communityDetailModel.findById(id);
  }

  async findByCommunityId(community: string) {
    return await this.communityDetailModel.findOne({
      community: new Types.ObjectId(community),
    });
  }
}
