import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  model: string;
  @Expose()
  make: string;
  @Expose()
  mileage: number;
  @Expose()
  longitude: number;
  @Expose()
  latitude: number;

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
