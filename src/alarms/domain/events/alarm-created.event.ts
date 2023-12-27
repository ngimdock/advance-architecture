import { Alarm } from '../alarm';

export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}
