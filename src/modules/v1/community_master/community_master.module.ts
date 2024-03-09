import { Module } from '@nestjs/common';
import { CommunityMasterService } from './community_master.service';
import { CommunityMasterController } from './community_master.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityMasterRepo } from 'src/repositories/community_master.repo';
import {
  CommunityMaster,
  communityMasterSchema,
} from 'src/schema/community_master.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommunityMaster.name, schema: communityMasterSchema },
    ]),
  ],
  providers: [CommunityMasterService, CommunityMasterRepo],
  controllers: [CommunityMasterController],
  exports: [CommunityMasterService],
})
export class CommunityMasterModule {}
