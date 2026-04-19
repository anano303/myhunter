import { IsEmail, IsString, IsOptional } from 'class-validator';

export class StockSubscriptionDto {
  @IsEmail()
  email!: string;

  @IsString()
  productId!: string;

  @IsOptional()
  @IsString()
  variantSize?: string;

  @IsOptional()
  @IsString()
  variantColor?: string;

  @IsOptional()
  @IsString()
  variantAgeGroup?: string;
}
