import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1930)
  @Max(2050)
  @Transform(({ value }) => parseInt(value))
  year: number;
  @IsNumber()
  @Min(0)
  @Max(10000000)
  @Transform(({ value }) => parseInt(value))
  mileage: number;
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  latitude: number;
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  longitude: number;
}
