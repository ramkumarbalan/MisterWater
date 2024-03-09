import { Injectable } from '@nestjs/common';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';
import { PaginationFilter } from 'src/shared/PaginationFilter';
import { paginationHelper } from 'src/shared/util';
import { CommunityMasterRepo } from 'src/repositories/community_master.repo';

@Injectable()
export class CommunityMasterService {
  constructor(private readonly communityMasterRepo: CommunityMasterRepo) {}

  async create(payload: any) {
    try {
      return await this.communityMasterRepo.create(payload);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async update(id: string, payload: any) {
    try {
      return await this.communityMasterRepo.update(id, payload);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async findAll(paginationFilter: PaginationFilter) {
    try {
      const response = await this.communityMasterRepo.findAll(paginationFilter);
      response.total = paginationHelper(response.total);
      return response;
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async findById(id: string) {
    try {
      return await this.communityMasterRepo.findById(id);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }
}
