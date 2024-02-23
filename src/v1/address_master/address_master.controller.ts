import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AddressMasterService } from './address_master.service';
import { PaginationFilter } from 'src/utility/common/PaginationFilter';
import { AuthGuard } from 'src/infrastructure/auth/auth.gaurd';

@Controller('address-master')
export class AddressMasterController {
  constructor(private readonly addressMasterService: AddressMasterService) {}

  @Post('/create')
  async create(@Body() body) {
    return await this.addressMasterService.create(body);
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body) {
    return await this.addressMasterService.update(id, body);
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['admin', 'vendor', 'customer'])
  async findAll(@Query() paginationFilter: PaginationFilter) {
    return await this.addressMasterService.findAll(paginationFilter);
  }
}
