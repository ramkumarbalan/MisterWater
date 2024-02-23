import { Injectable } from '@nestjs/common';
import { AddressRepo } from 'src/repositories/address.repo';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepo: AddressRepo) {}
}
