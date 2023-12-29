import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';
import { AlarmItem } from 'src/alarms/domain/alarm-item';
import { AlarmItemEntity } from '../entities/alarm-item.entity';

export class AlarmMapper {
  static toDomain(alarmEntity: AlarmEntity): Alarm {
    const alarmSeverity = new AlarmSeverity(
      alarmEntity.severity as AlarmSeverity['value'],
    );

    const alarm = new Alarm(alarmEntity.id);
    alarm.name = alarmEntity.name;
    alarm.severity = alarmSeverity;
    alarm.isAcknowledged = alarmEntity.isAcknowledged;
    alarm.triggeredAt = alarmEntity.triggeredAt;
    alarm.items = alarmEntity.items.map((item) => {
      return new AlarmItem(item.id, item.name, item.type);
    });

    return alarm;
  }

  static toPersistence(alarm: Alarm): AlarmEntity {
    const entity = new AlarmEntity();
    entity.id = alarm.id;
    entity.name = alarm.name;
    entity.severity = alarm.severity.value;
    entity.isAcknowledged = alarm.isAcknowledged;
    entity.triggeredAt = alarm.triggeredAt;
    entity.items = alarm.items.map((item) => {
      const itemEntity = new AlarmItemEntity();
      itemEntity.id = item.id;
      itemEntity.name = item.name;
      itemEntity.type = item.type;

      return itemEntity;
    });

    return entity;
  }
}
