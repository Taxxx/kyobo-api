import {Entity, hasMany, model, property} from '@loopback/repository';
import {Athlete} from './athlete.model';
import {Team} from './team.model';

@model()
export class Academy extends Entity {
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
  location?: string;

  @property({
    type: 'string',
  })
  headmaster?: string;

  @hasMany(() => Athlete)
  athletes: Athlete[];

  @hasMany(() => Team)
  teams: Team[];

  constructor(data?: Partial<Academy>) {
    super(data);
  }
}

export interface AcademyRelations {
  // describe navigational properties here
}

export type AcademyWithRelations = Academy & AcademyRelations;
