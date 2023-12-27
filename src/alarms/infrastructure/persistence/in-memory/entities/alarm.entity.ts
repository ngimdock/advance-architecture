import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';

export class AlarmEntity {
  id: string;

  name: string;

  severity: AlarmSeverity['value'];
}
