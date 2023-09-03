import {Entity, model, property, hasMany} from '@loopback/repository';
import {Event} from './event.model';

@model()
export class Championship extends Entity {
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
  startDate: string;

  @property({
    type: 'date',
    required: true,
  })
  endDate: string;

  @hasMany(() => Event)
  MyChampionshipId: Event[];

  constructor(data?: Partial<Championship>) {
    super(data);
  }
}

export interface ChampionshipRelations {
  // describe navigational properties here
}

export type ChampionshipWithRelations = Championship & ChampionshipRelations;
