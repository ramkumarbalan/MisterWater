import { HttpStatus, Injectable } from '@nestjs/common';
import moment from 'moment';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';
import { MobileStoreRepo } from 'src/repositories/mobile_store.repo';
import { UserRepo } from 'src/repositories/user.repo';
import { generateRandomOTP, generateUuid, sign } from 'src/utility/util';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly mobileStoreRepo: MobileStoreRepo
  ) { }

  async create(payload: any) {
    try {
      const verifyUUID = await this.mobileStoreRepo.findUUID(payload.id);
      if (verifyUUID) {
        payload.mobile_number = verifyUUID.mobile_number
        payload.mobile_code = verifyUUID.mobile_code
        const user = await this.userRepo.create(payload);
        const token = await sign({ _id: user.id, role: user.role });
        return { user, token };
      } else {
        return formatErrorResponse({ message: 'Phone number is not verifed yet to create profile' }, HttpStatus.BAD_REQUEST);
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

  async verifyPhone(body: any) {
    try {
      if (body.mobile_code && body.mobile_number) {
        const isUserExists = await this.mobileStoreRepo.findPhone(body.mobile_number);
        if (!isUserExists) {
          const uuid = await generateUuid()
          body.otp = generateRandomOTP();
          body.uuid = uuid;
          const createUser = await this.mobileStoreRepo.createPhone(body);
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
      const verified = await this.mobileStoreRepo.verifyPhone(body.code, body.id);
      if (verified) {
        const user = await this.userRepo.findPhone(verified.mobile_number);
        if (user != null) {
          const token = await sign({ _id: user.id, role: user.role });
          return { user, token, isProfile: true };
        } else {
          return { isProfile: false, uuid: verified.uuid };
        }
      }
      return formatErrorResponse({ message: 'Invalid code' }, HttpStatus.BAD_REQUEST);
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
