import { Test, TestingModule } from '@nestjs/testing';
import { AddressMasterService } from './address_master.service';

describe('AddressMasterService', () => {
  let service: AddressMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressMasterService],
    }).compile();

    service = module.get<AddressMasterService>(AddressMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
