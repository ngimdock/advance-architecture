import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';

export class CreateAlarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  @IsNotEmpty()
  severity: AlarmSeverity['value'];
}
