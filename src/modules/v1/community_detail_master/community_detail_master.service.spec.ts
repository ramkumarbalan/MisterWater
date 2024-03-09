import { Test, TestingModule } from '@nestjs/testing';
import { CommunityDetailMasterService } from './community_detail_master.service';

describe('CommunityDetailMasterService', () => {
  let service: CommunityDetailMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityDetailMasterService],
    }).compile();

    service = module.get<CommunityDetailMasterService>(CommunityDetailMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
