import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private repository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repository.create(reportDto);
    report.user = user;
    return this.repository.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repository.findOne(id);
    if (!report) {
      throw new NotFoundException('Report not found');
    }

    report.approved = approved;
    return this.repository.save(report);
  }

  estimate(query: GetEstimateDto) {
    return this.repository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', { make: query.make })
      .andWhere('model=:model', { model: query.model })
      .andWhere('longitude-:longitude BETWEEN -5 AND 5', {
        longitude: query.longitude,
      })
      .andWhere('latitude-:latitude BETWEEN -5 AND 5', {
        latitude: query.latitude,
      })
      .andWhere('year-:year BETWEEN -3 AND 3', {
        year: query.year,
      })
      .andWhere('approved IS TRUE')
      .orderBy('mileage-:mileage', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }
}
