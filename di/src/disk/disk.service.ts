import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData() {
    console.log('Drawing 200 watts of Power service');
    this.powerService.supplyPower(20);
    return 'data!';
  }
}
