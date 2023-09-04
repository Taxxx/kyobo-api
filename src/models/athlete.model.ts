import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Team} from './team.model';

@model()
export class Athlete extends Entity {
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
  names: string;

  @property({
    type: 'string',
    required: true,
  })
  lastNames: string;

  @property({
    type: 'string',
  })
  documentId: string;

  @property({
    type: 'number',
  })
  age: number;

  @property({
    type: 'string',
  })
  address: string;

  @property({
    type: 'string',
  })
  country: string;

  @property({
    type: 'string',
  })
  city: string;

  @property({
    type: 'string',
  })
  height: string;

  @property({
    type: 'string',
  })
  weight?: string;

  @property({
    type: 'string',
  })
  degree?: string;

  @property({
    type: 'number',
    required: true,
  })
  eventId: number;

  @belongsTo(() => Team)
  teamId: number;

  @property({
    type: 'number',
  })
  academyId?: number;

  constructor(data?: Partial<Athlete>) {
    super(data);
  }
}

export interface AthleteRelations {
  // describe navigational properties here
}

export type AthleteWithRelations = Athlete & AthleteRelations;
