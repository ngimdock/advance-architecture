import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { AlarmRepository } from '../ports/alarm.repository';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { Alarm } from 'src/alarms/domain/alarm';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand, Alarm>
{
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
  ) {}
  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    const alarm = this.alarmFactory.create(command.name, command.severity);

    return this.alarmRepository.save(alarm);
  }
}
