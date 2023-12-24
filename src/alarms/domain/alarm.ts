import { AlarmSeverity } from './value-objects/alarm-severity';

export class Alarm {
  constructor(
    public id: string,
    public name: string,
    public severity: AlarmSeverity,
  ) {}
}
