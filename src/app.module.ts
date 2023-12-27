import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/application/alarms.module';
import { AlarmInfrastructureModule } from './alarms/infrastructure/alarm-infrasctructure.module';

@Module({
  imports: [
    AlarmsModule.withInfastructure(AlarmInfrastructureModule.use('in-memory')),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
