import { Injectable, Type } from '@nestjs/common';
import { EventStore } from './ports/event-store';
import { EventPublisher } from '@nestjs/cqrs';
import { VersionedAggregateRoot } from '../domain/aggregate-root';

@Injectable()
export class AggregateRehydrator {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async rehydrate<T extends VersionedAggregateRoot>(
    aggregateId: string,
    aggregateCls: Type<T>,
  ): Promise<T> {
    const events = await this.eventStore.getEventsByStreamId(aggregateId);

    const AggregateClsWithDispatcher =
      this.eventPublisher.mergeClassContext(aggregateCls);

    const aggregate = new AggregateClsWithDispatcher(aggregateId);

    aggregate.loadFromHistory(events);

    return aggregate;
  }
}
