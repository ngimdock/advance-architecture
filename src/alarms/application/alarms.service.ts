import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAlarmsQuery } from './queries/find-alarms.query';
import { AcknowledgeAlarmCommand } from './commands/acknowledge-alarm.command';

@Injectable()
export class AlarmsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  create(command: CreateAlarmCommand) {
    return this.commandBus.execute(command);
  }

  findAll() {
    return this.queryBus.execute(new FindAlarmsQuery());
  }

  acknowledge(alarmId: string) {
    return this.commandBus.execute(new AcknowledgeAlarmCommand(alarmId));
  }
}
