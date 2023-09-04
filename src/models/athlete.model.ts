import {
  Entity,
  belongsTo,
  model,
  property,
  hasMany,
} from '@loopback/repository';
import {Team} from './team.model';
import {Academy} from './academy.model';
import {Match} from './match.model';
import {MatchParticipant} from './match-participant.model';

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

  @belongsTo(() => Academy)
  academyId: number;

  @hasMany(() => Match, {through: {model: () => MatchParticipant}})
  matches: Match[];

  constructor(data?: Partial<Athlete>) {
    super(data);
  }
}

export interface AthleteRelations {
  // describe navigational properties here
}

export type AthleteWithRelations = Athlete & AthleteRelations;
