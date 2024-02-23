import { Module } from '@nestjs/common';
import { AddressMasterService } from './address_master.service';
import { AddressMasterController } from './address_master.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AddressMaster,
  addressMasterSchema,
} from 'src/schema/address-master.schema';
import { AddressMasterRepo } from 'src/repositories/address_master.repo';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: AddressMaster.name, schema: addressMasterSchema },
    ]),
  ],
  providers: [AddressMasterService, AddressMasterRepo],
  controllers: [AddressMasterController],
})
export class AddressMasterModule {}
