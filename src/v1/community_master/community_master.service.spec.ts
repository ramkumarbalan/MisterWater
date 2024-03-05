import { Test, TestingModule } from '@nestjs/testing';
import { CommounityMasterService } from './community_master.service';

describe('CommounityMasterService', () => {
  let service: CommounityMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommounityMasterService],
    }).compile();

    service = module.get<CommounityMasterService>(CommounityMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
