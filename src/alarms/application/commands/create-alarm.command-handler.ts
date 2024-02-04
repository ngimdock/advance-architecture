import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { Alarm } from 'src/alarms/domain/alarm';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand, Alarm>
{
  constructor(
    private readonly alarmFactory: AlarmFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}
  async execute(command: CreateAlarmCommand): Promise<Alarm> {
    const alarm = this.alarmFactory.create(
      command.name,
      command.severity,
      command.triggeredAt,
      command.items,
    );

    // This call the apply() method of the aggragate
    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();

    return alarm;
  }
}
