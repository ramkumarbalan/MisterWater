import { Test, TestingModule } from '@nestjs/testing';
import { CommunityDetailMasterController } from './community_detail_master.controller';

describe('CommunityDetailMasterController', () => {
  let controller: CommunityDetailMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityDetailMasterController],
    }).compile();

    controller = module.get<CommunityDetailMasterController>(CommunityDetailMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
