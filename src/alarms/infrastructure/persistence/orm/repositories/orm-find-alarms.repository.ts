import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-view.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class OrmFindAlarmsRepository implements FindAlarmsRepository {
  constructor(
    @InjectModel(MaterializedAlarmView.name)
    private readonly alarmModel: Model<MaterializedAlarmView>,
  ) {}

  findAll(): Promise<AlarmReadModel[]> {
    return this.alarmModel.find(); // We don't need to perform mapping from alarm schema to AlarmReadModel because they have the same properties
  }
}
