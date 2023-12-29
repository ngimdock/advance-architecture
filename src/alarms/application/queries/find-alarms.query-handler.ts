import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAlarmsQuery } from './find-alarms.query';
import { FindAlarmsRepository } from '../ports/find-alarms.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';

@QueryHandler(FindAlarmsQuery)
export class FindAlarmsQueryHandler
  implements IQueryHandler<FindAlarmsQuery, AlarmReadModel[]>
{
  constructor(private readonly alarmRepository: FindAlarmsRepository) {}

  execute(query: FindAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }
}
