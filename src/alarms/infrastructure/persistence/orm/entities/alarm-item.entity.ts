import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { AlarmEntity } from './alarm.entity';

@Entity('alarm_items')
export class AlarmItemEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => AlarmEntity, (alarm) => alarm.items)
  alarm: AlarmEntity;
}
