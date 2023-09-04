import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Athlete} from './athlete.model';
import {Team} from './team.model';
import {Match} from './match.model';

@model()
export class MatchParticipant extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Athlete)
  athleteId: number;

  @belongsTo(() => Team)
  teamId: number;

  @belongsTo(() => Match)
  matchId: number;

  constructor(data?: Partial<MatchParticipant>) {
    super(data);
  }
}

export interface MatchParticipantRelations {
  // describe navigational properties here
}

export type MatchParticipantWithRelations = MatchParticipant & MatchParticipantRelations;
