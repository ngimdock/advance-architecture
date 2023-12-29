import { Alarm } from 'src/alarms/domain/alarm';

export abstract class CreateAlarmRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
}
