import { Injectable } from '@nestjs/common';
import { AlarmRepository } from 'src/alarms/application/ports/alarm.repository';
import { Alarm } from 'src/alarms/domain/alarm';
import { AlarmMapper } from '../mappers/alarm.mapper';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  constructor() {
    this.alarms.set('1', { id: '1', name: 'Left room', severity: 'CRITICAL' });
    this.alarms.set('2', { id: '2', name: 'Eat food', severity: 'MEDIUM' });
    this.alarms.set('3', { id: '3', name: 'Sleep', severity: 'LOW' });
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);

    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);

    return AlarmMapper.toDomain(newEntity);
  }
  async findAll(): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values());

    return entities.map(AlarmMapper.toDomain);
  }
}
