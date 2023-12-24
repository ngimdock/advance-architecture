import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../presenters/dto/create-alarm.dto';
import { UpdateAlarmDto } from '../presenters/dto/update-alarm.dto';

@Injectable()
export class AlarmsService {
  create(createAlarmDto: CreateAlarmDto) {
    return 'This action adds a new alarm';
  }

  findAll() {
    return `This action returns all alarms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alarm`;
  }

  update(id: number, updateAlarmDto: UpdateAlarmDto) {
    return `This action updates a #${id} alarm`;
  }

  remove(id: number) {
    return `This action removes a #${id} alarm`;
  }
}
