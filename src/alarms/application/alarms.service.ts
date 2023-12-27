import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAlarmsQuery } from './queries/find-alarms.query';

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
}
