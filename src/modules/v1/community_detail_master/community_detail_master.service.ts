import { HttpStatus, Injectable } from '@nestjs/common';
import { CommunityDetailMasterRepo } from 'src/repositories/community_detail_master.repo';
import { CommunityMasterService } from '../community_master/community_master.service';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';

@Injectable()
export class CommunityDetailMasterService {
  constructor(
    private readonly communityDetailMasterRepo: CommunityDetailMasterRepo,
    private readonly communityMasterService: CommunityMasterService,
  ) {}

  async create(payload: any) {
    try {
      const community = await this.communityMasterService.findById(
        payload.community,
      );
      if (community) {
        payload.community = community._id;
        return await this.communityDetailMasterRepo.create(payload);
      } else {
        return formatErrorResponse(
          { message: 'Invalid Community' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async findById(id: string) {
    try {
      return await this.communityDetailMasterRepo.findById(id);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async findByCommunityId(id: string) {
    try {
      return await this.communityDetailMasterRepo.findByCommunityId(id);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }
}
