import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types , Schema as mongooseSchema} from 'mongoose';
import { CommunityMaster } from './community_master.schema';


@Schema({ timestamps: true, strict: true })
export class CommunityDetailMaster {
  @Prop({ type: Types.ObjectId, ref: 'CommunityMaster' })
  community: CommunityMaster;

  @Prop([{ type: [mongooseSchema.Types.Mixed] }])
  buildings: [{
    name: string,
    door_no: string
  }];
}

export const communityDetailMasterSchema = SchemaFactory.createForClass(CommunityDetailMaster);
