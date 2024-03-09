import { HttpStatus, Injectable } from '@nestjs/common';
import moment from 'moment';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';
import { MobileStoreRepo } from 'src/repositories/mobile_store.repo';
import { UserRepo } from 'src/repositories/user.repo';
import { generateRandomOTP, generateUuid, sign } from 'src/shared/util';
import { CommunityMasterService } from '../community_master/community_master.service';
import { AddressDto } from 'src/shared/dto/address_response.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly mobileStoreRepo: MobileStoreRepo,
    private readonly communityMasterService: CommunityMasterService,
  ) {}

  async create(payload: any) {
    try {
      const verifyUUID = await this.mobileStoreRepo.findUUID(payload.uuid);
      if (verifyUUID) {
        payload.mobile_number = verifyUUID.mobile_number;
        payload.mobile_code = verifyUUID.mobile_code;

        const community: any = await this.communityMasterService.findById(
          payload.addresses[0].address,
        );

        if (!community) {
          return formatErrorResponse(
            { message: 'Invalid Community' },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          payload.addresses[0].address = community._id;
        }
        const user: any = await this.userRepo.create(payload);
        const addressDto = await plainToClass(AddressDto, community, {
          strategy: 'excludeAll',
          enableImplicitConversion: true,
        });
        user.addresses[0].address = addressDto;
        const token = await sign({ _id: user.id, role: user.role });
        return { user, token };
      } else {
        return formatErrorResponse(
          { message: 'Phone number is not verifed yet to create profile' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async findById(id: string) {
    try {
      return await this.userRepo.findById(id);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async requestOtp(body: any) {
    try {
      if (body.mobile_code && body.mobile_number) {
        const isUserExists = await this.mobileStoreRepo.findPhone(body);
        if (!isUserExists) {
          const uuid = await generateUuid();
          body.uuid = uuid;
          const createUser = await this.mobileStoreRepo.create(body);
          return createUser;
        }
        return isUserExists;
      }
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }
  async verifyOTP(body: any) {
    try {
      const verified = await this.mobileStoreRepo.validateOtp(
        body.code,
        body.uuid,
      );
      if (verified) {
        const user = await this.userRepo.findPhone(verified.mobile_number);
        if (user != null) {
          const token = await sign({ _id: user.id, role: user.role });
          return { user, token, message: 'OTP Verified Successfully' };
        } else {
          return { message: 'OTP Verified Successfully', uuid: body.uuid };
        }
      }
      return formatErrorResponse(
        {
          message: 'Invalid OTP. Please double-check and try again.',
        },
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async isPhoneVerified(user: any) {
    try {
      const data = await this.userRepo.isPhoneVerified(user.id);
      if (data) return true;
      return false;
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async getProfile(id) {
    try {
      return await this.userRepo.findById(id);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }
}
