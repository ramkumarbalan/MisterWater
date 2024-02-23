import { Injectable } from '@nestjs/common';
import { formatErrorResponse } from 'src/infrastructure/response-formatter/response-formatter';
import { PaginationFilter } from 'src/utility/common/PaginationFilter';
import { paginationHelper } from 'src/utility/util';
import { AddressMasterRepo } from 'src/repositories/address_master.repo';

@Injectable()
export class AddressMasterService {
  constructor(private readonly addressMasterRepo: AddressMasterRepo) {}

  async create(payload: any) {
    try {
      return await this.addressMasterRepo.create(payload);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async update(id: string, payload: any) {
    try {
      return await this.addressMasterRepo.update(id, payload);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async findAll(paginationFilter: PaginationFilter) {
    try {
      const response = await this.addressMasterRepo.findAll(paginationFilter);
      response.total = paginationHelper(response.total);
      return response;
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }

  async findById(id: string) {
    try {
      return await this.addressMasterRepo.findById(id);
    } catch (e) {
      return formatErrorResponse(e, e.status);
    }
  }
}
