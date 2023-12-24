import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';

export class CreateAlarmDto {
  name: string;
  severity: AlarmSeverity['value'];
}
