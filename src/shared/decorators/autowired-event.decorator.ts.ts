import { EventClsRegistry } from '../infrastructure/event-store/event-cls.registry';

export const AutowiredEvent: ClassDecorator = (target: any) => {
  EventClsRegistry.add(target);
};
