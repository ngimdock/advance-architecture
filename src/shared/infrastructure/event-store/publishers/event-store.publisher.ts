import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { MongoEventStore } from '../mongo-event-store';
import { EventSerializer } from '../serializers/event.serializer';
import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  constructor(
    private readonly eventSerializer: EventSerializer,
    private readonly eventStoreRepository: MongoEventStore,
    private readonly eventBus: EventBus,
  ) {}

  onApplicationBootstrap() {
    this.eventBus.publisher = this;
  }
  async publish<T extends IEvent = IEvent>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ) {
    const serializebleEvent = this.eventSerializer.serialize(event, dispatcher);
    return this.eventStoreRepository.persist(serializebleEvent);
  }

  publishAll?<T extends IEvent>(
    events: T[],
    dispatcher: VersionedAggregateRoot,
  ) {
    const SerializableEvents = events
      .map((event) => this.eventSerializer.serialize(event, dispatcher))
      .map((serializableEvent) => ({
        ...serializableEvent,
        position: dispatcher.getVertion().value + 1,
      }));

    return this.eventStoreRepository.persist(SerializableEvents);
  }
}
