import { randomUUID } from 'crypto';
import { Alarm } from '../alarm';
import { AlarmSeverity } from '../value-objects/alarm-severity';

export class AlarmFactory {
  create(name: string, severity: string) {
    const id = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);
    return new Alarm(id, name, alarmSeverity);
  }
}
