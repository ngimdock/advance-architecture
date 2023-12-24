import { Module } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/alarms.controller';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService],
})
export class AlarmsModule {}
