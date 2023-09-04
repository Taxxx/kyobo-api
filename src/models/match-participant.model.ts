import {Entity, model, property} from '@loopback/repository';

@model()
export class MatchParticipant extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<MatchParticipant>) {
    super(data);
  }
}

export interface MatchParticipantRelations {
  // describe navigational properties here
}

export type MatchParticipantWithRelations = MatchParticipant & MatchParticipantRelations;
