import { HttpStatus, Injectable } from '@nestjs/common';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';
import { VendorRepo } from 'src/repositories/vendor.repo';
import { UserService } from '../user/user.service';

@Injectable()
export class VendorService {
  constructor(
    private readonly vendorRepo: VendorRepo,
    private readonly userService: UserService,
  ) {}

  async create(user: any, payload: any) {
    try {
      const isVerified = await this.userService.isPhoneVerified(user);
      if (isVerified) {
        payload.user = user.id;
        return await this.vendorRepo.create(payload);
      } else {
        return formatErrorResponse(
          { message: 'Invalid User' },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }
}
