import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.gaurd';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() body) {
    return await this.userService.create(body);
  }

  @Post('/request_otp')
  async requestOtp(@Body() body) {
    return await this.userService.requestOtp(body);
  }

  @Post('/verify')
  @UseGuards(AuthGuard)
  async verify(@Req() req) {
    return await this.userService.verifyPhone(req.user.id, req.body);
  }
}
