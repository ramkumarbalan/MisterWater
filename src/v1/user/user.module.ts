import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/user.schema';
import { UserRepo } from 'src/repositories/user.repo';
import { MobileStoreRepo } from 'src/repositories/mobile_store.repo';
import { MobileStore, mobileStoreSchema } from 'src/schema/mobile_store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }, { name: MobileStore.name, schema: mobileStoreSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepo, MobileStoreRepo],
  exports: [UserService],
})
export class UserModule { }
