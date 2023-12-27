import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsService } from './alarms.service';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { FindAlarmsQueryHandler } from './queries/find-alarms.query-handler';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsService,
    AlarmFactory,
    CreateAlarmCommandHandler,
    FindAlarmsQueryHandler,
  ],
})
export class AlarmsModule {
  static withInfastructure(
    infrastructureModule: Type | DynamicModule,
  ): DynamicModule {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
