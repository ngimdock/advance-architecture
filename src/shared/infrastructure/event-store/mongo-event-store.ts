import { Injectable, Logger } from '@nestjs/common';
import { Event } from './schemas/event.schema';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SerializableEvent } from 'src/shared/domain/interfaces/serializable-event';

@Injectable()
export class MongoEventStore {
  private readonly logger = new Logger(MongoEventStore.name);

  constructor(
    @InjectModel(Event.name, EVENT_STORE_CONNECTION)
    private readonly eventStoreModel: Model<Event>,
  ) {}

  async persist(eventOrEvents: SerializableEvent | SerializableEvent[]) {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const session = await this.eventStoreModel.startSession();

    try {
      session.startTransaction();

      await this.eventStoreModel.insertMany(events, { session, ordered: true });

      await session.commitTransaction();

      this.logger.debug(`Events inserted successfully in the event store`);
    } catch (error) {
      await session.abortTransaction();

      const UNIQUE_CONSTRAIN_ERROR_CODE = 11000;
      if (error?.code === UNIQUE_CONSTRAIN_ERROR_CODE) {
        this.logger.error(`Event could not be persisted. Aggregate is stale`);
        console.error(error.writeErrors?.[0]?.err?.errmsg);
      } else throw error;
    } finally {
      await session.endSession();
    }
  }
}
