import { Module } from '@nestjs/common';
import { VendorController } from './vendor.controller';
import { VendorService } from './vendor.service';
import { VendorRepo } from 'src/repositories/vendor.repo';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, vendorSchema } from 'src/schema/vendor.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      {
        name: Vendor.name,
        schema: vendorSchema,
      },
    ]),
  ],
  controllers: [VendorController],
  providers: [VendorService, VendorRepo],
})
export class VendorModule {}
