import { Exclude, Expose, Type } from 'class-transformer';

class LocationDto {
  @Expose({ name: 'type' })
  type: string;

  @Expose({ name: 'coordinates' })
  coordinates: number[];
}

export class AddressDto {
  @Expose({ name: '_id' })
  id: string;

  @Expose({ name: 'community_name' })
  communityName: string;

  @Expose({ name: 'addressLine1' })
  addressLine1: string;

  @Expose({ name: 'addressLine2' })
  addressLine2: string;

  @Expose({ name: 'location' })
  @Type(() => LocationDto)
  location: LocationDto;

  @Expose()
  city: string;

  @Expose()
  state: string;

  @Expose()
  country: string;

  @Expose()
  pincode: number;
}
