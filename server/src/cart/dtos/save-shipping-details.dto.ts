import { IsString, IsOptional } from 'class-validator';

export class SaveShippingDetailsDto {
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
