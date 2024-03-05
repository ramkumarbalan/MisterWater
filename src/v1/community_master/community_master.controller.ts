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
import { CommounityMasterService } from './community_master.service';
import { PaginationFilter } from 'src/utility/common/PaginationFilter';
import { AuthGuard } from 'src/infrastructure/auth/auth.gaurd';

@Controller('address-master')
export class CommunityMasterController {
  constructor(private readonly commounityMasterService: CommounityMasterService) {}

  @Post('/create')
  async create(@Body() body) {
    return await this.commounityMasterService.create(body);
  }

  @Post('/update/:id')
  async update(@Param('id') id: string, @Body() body) {
    return await this.commounityMasterService.update(id, body);
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  @SetMetadata('roles', ['admin', 'vendor', 'customer'])
  async findAll(@Query() paginationFilter: PaginationFilter) {
    return await this.commounityMasterService.findAll(paginationFilter);
  }
}
