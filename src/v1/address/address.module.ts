import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { AddressRepo } from 'src/repositories/address.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, addressSchema } from 'src/schema/address.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Address.name, schema: addressSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService, AddressRepo],
})
export class AddressModule {}
