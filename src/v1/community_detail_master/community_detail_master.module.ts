import { Module } from '@nestjs/common';
import { CommunityDetailMasterController } from './community_detail_master.controller';
import { CommunityDetailMasterService } from './community_detail_master.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityDetailMaster, communityDetailMasterSchema } from 'src/schema/community_detail.schema';
import { UserModule } from '../user/user.module';
import { CommunityDetailMasterRepo } from 'src/repositories/community_detail_master.repo';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: CommunityDetailMaster.name, schema: communityDetailMasterSchema }]),
  ],
  controllers: [CommunityDetailMasterController],
  providers: [CommunityDetailMasterService, CommunityDetailMasterRepo],
})
export class CommunityDetailMasterModule {}
