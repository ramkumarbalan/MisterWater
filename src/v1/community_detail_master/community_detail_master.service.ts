import { Injectable } from '@nestjs/common';
import { CommunityDetailMasterRepo } from 'src/repositories/community_detail_master.repo';

@Injectable()
export class CommunityDetailMasterService {
  constructor(private readonly communityDetailMasterRepo: CommunityDetailMasterRepo) {}
}
