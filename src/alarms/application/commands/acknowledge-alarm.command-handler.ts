import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AggregateRehydrator } from '../../../shared/application/aggregate-rehydrator';
import { AcknowledgeAlarmCommand } from './acknowledge-alarm.command';
import { Alarm } from '../../domain/alarm';

@CommandHandler(AcknowledgeAlarmCommand)
export class AcknowledgeAlarmCommandHandler
  implements ICommandHandler<AcknowledgeAlarmCommand>
{
  private readonly logger = new Logger(AcknowledgeAlarmCommandHandler.name);

  constructor(private readonly aggregareRehydrator: AggregateRehydrator) {}

  async execute(command: AcknowledgeAlarmCommand) {
    this.logger.debug(
      `Processing "AcknowledgeAlarmCommand": ${JSON.stringify(command)}`,
    );

    const alarm = await this.aggregareRehydrator.rehydrate(
      command.alarmId,
      Alarm,
    );
    alarm.acknowlege();
    alarm.commit();
    return alarm;
  }
}
