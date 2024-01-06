import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Event {
  @Prop()
  streamId: string;

  @Prop()
  type: string;

  @Prop()
  position: number;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  data: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ streamId: 1, position: 1 }, { unique: true });
