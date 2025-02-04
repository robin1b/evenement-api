// models/Event.ts
import { Schema, model, Document } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  date: Date;
  location: string;
  description?: string;
  isFree: boolean;
}

const EventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  isFree: { type: Boolean, default: false },
});

export default model<IEvent>('Event', EventSchema);
