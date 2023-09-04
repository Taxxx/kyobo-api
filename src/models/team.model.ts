import {Entity, model, property, hasMany} from '@loopback/repository';
import {Athlete} from './athlete.model';

@model()
export class Team extends Entity {
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
    type: 'string',
  })
  coachName?: string;

  @hasMany(() => Athlete)
  athletes: Athlete[];

  @property({
    type: 'number',
  })
  academyId?: number;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
