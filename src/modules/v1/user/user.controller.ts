import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.gaurd';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/request_otp')
  async verifyPhone(@Body() body) {
    return await this.userService.requestOtp(body);
  }

  @Post('/verify_otp')
  async verify(@Req() req) {
    return await this.userService.verifyOTP(req.body);
  }

  @Post('/')
  async create(@Body() body) {
    return await this.userService.create(body);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profle(@Req() req) {
    return await this.userService.getProfile(req.user.id);
  }

}
