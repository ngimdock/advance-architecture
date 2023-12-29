import {
  IsArray,
  IsDate,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';
import { AlarmItemDto } from './alarm-item.dto';
import { Type } from 'class-transformer';

export class CreateAlarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  @IsNotEmpty()
  severity: AlarmSeverity['value'];

  @IsDateString()
  @IsNotEmpty()
  triggeredAt: Date;

  @IsArray()
  @Type(() => AlarmItemDto)
  @ValidateNested({ each: true })
  items: AlarmItemDto[];
}
