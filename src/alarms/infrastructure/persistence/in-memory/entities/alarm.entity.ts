import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';
import { AlarmItemEntity } from './alarm-item.entity';

export class AlarmEntity {
  id: string;

  name: string;

  severity: AlarmSeverity['value'];

  triggeredAt: Date;

  isAcknowledged: boolean;

  items: Array<AlarmItemEntity>;
}
