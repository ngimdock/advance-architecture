import { AutowiredEvent } from 'src/shared/decorators/autowired-event.decorator.ts';

@AutowiredEvent
export class AlarmAcknowledgedEvent {
  constructor(public readonly alarmId: string) {}
}
