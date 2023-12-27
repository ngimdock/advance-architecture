import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAlarmsQuery } from './find-alarms.query';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmRepository } from '../ports/alarm.repository';

@QueryHandler(FindAlarmsQuery)
export class FindAlarmsQueryHandler
  implements IQueryHandler<FindAlarmsQuery, Alarm[]>
{
  constructor(private readonly alarmRepository: AlarmRepository) {}

  execute(query: FindAlarmsQuery): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }
}
