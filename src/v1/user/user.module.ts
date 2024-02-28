import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schema/user.schema';
import { UserRepo } from 'src/repositories/user.repo';
import { PhoneVerificationRepo } from 'src/repositories/phone_verification.repo';
import { PhoneVerfication, phoneVerficationSchema } from 'src/schema/verification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }, { name: PhoneVerfication.name, schema: phoneVerficationSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepo,PhoneVerificationRepo],
  exports: [UserService],
})
export class UserModule {}
