import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmRepository } from './ports/alarm.repository';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly alarmRepoitory: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}
  create(createAlarmDto: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(
      createAlarmDto.name,
      createAlarmDto.severity,
    );

    return this.alarmRepoitory.save(alarm);
  }

  findAll() {
    return this.alarmRepoitory.findAll();
  }
}
