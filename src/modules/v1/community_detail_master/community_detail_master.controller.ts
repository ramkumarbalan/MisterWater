import { Controller, Get, Post, Req } from '@nestjs/common';
import { CommunityDetailMasterService } from './community_detail_master.service';

@Controller('v1/community_detail_master')
export class CommunityDetailMasterController {
  constructor(
    private readonly communityDetailMasterService: CommunityDetailMasterService,
  ) {}

  @Post('')
  async create(@Req() req) {
    return await this.communityDetailMasterService.create(req.body);
  }

  @Get('/:id')
  async findById(@Req() req) {
    return await this.communityDetailMasterService.findById(req.params.id);
  }

  @Get('/community/:id')
  async findByCommunityId(@Req() req) {
    return await this.communityDetailMasterService.findByCommunityId(
      req.params.id,
    );
  }
}
