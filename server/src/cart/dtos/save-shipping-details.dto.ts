import { IsString, IsOptional, IsIn } from 'class-validator';

export class SaveShippingDetailsDto {
  @IsString()
  @IsOptional()
  @IsIn(['pickup', 'delivery'])
  deliveryType?: 'pickup' | 'delivery';

  @IsString()
  address!: string;

  @IsString()
  city!: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  country!: string;

  @IsString()
  phoneNumber!: string;
}
