import { Controller, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { AuthGuard } from 'src/infrastructure/auth/auth.gaurd';

@Controller('v1/vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['vendor'])
  async create(@Req() req) {
    return await this.vendorService.create(req.user, req.body);
  }
}
