import { Module } from '@nestjs/common';
import { CommounityMasterService } from './community_master.service';
import { CommunityMasterController } from './community_master.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunityMasterRepo } from 'src/repositories/community_master.repo';
import { UserModule } from '../user/user.module';
import { CommunityMaster, communityMasterSchema } from 'src/schema/community_master.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: CommunityMaster.name, schema: communityMasterSchema },
    ]),
  ],
  providers: [CommounityMasterService, CommunityMasterRepo],
  controllers: [CommunityMasterController],
})
export class CommounityMasterModule {}
