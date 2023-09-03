import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Event} from './event.model';

@model()
export class Match extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;
  @property({
    type: 'number',
  })
  roundNumber?: number;

  @property({
    type: 'number',
  })
  bracketNumber?: number;

  @property({
    type: 'number',
  })
  firstParticipantId?: number;

  @property({
    type: 'number',
  })
  secondParticipantId?: number;

  @property({
    type: 'number',
  })
  firstTeamId?: number;

  @property({
    type: 'number',
  })
  secondTeamId?: number;

  @property({
    type: 'number',
  })
  winnerId?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @belongsTo(() => Event)
  eventId: number;

  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
