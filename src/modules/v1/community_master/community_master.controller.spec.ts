import { Test, TestingModule } from '@nestjs/testing';
import { AddressMasterController } from './community_master.controller';

describe('AddressMasterController', () => {
  let controller: AddressMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressMasterController],
    }).compile();

    controller = module.get<AddressMasterController>(AddressMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
