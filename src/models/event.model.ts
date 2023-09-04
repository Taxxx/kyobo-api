import {Entity, model, property, hasMany} from '@loopback/repository';
import {Match} from './match.model';

@model()
export class Event extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  location?: string;

  @property({
    type: 'number',
    required: true,
  })
  championshipId: number;

  @hasMany(() => Match)
  matches: Match[];

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
