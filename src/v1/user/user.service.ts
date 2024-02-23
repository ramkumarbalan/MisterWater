import { HttpStatus, Injectable } from '@nestjs/common';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';
import { UserRepo } from 'src/repositories/user.repo';
import { sign } from 'src/utility/util';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  async create(payload: any) {
    try {
      const user = await this.userRepo.create(payload);
      const token = await sign(user);
      return { user, token };
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
      const { mobile_code, mobile_number } = body;
      const user = await this.userRepo.requestOtp(mobile_code, mobile_number);
      if (user) {
        const token = await sign(user);
        return {
          message:
            'Your One-Time Password (OTP) has been dispatched to your mobile number',
          token,
        };
      }
      return formatErrorResponse(
        { message: 'Invalid User' },
        HttpStatus.BAD_REQUEST,
      );
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async verifyPhone(id: string, body: any) {
    try {
      const user = await this.userRepo.verifyPhone(id, body.code);
      if (user) {
        const token = await sign(user);
        return { user, token };
      }
      return formatErrorResponse(
        { message: 'Invalid code' },
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
}
