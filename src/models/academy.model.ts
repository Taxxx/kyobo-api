import {Entity, model, property, hasMany} from '@loopback/repository';
import {Athlete} from './athlete.model';
import {Team} from './team.model';

// Note: There is no plans to allow aditional data but this is left here just
// as an example for future references.
// TODO: Remove later {settings: {strict: false}}
@model({settings: {strict: false}})
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
  // Note: There is no plans to allow aditional data but this is left here just
  // as an example for future references.

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Academy>) {
    super(data);
  }
}

export interface AcademyRelations {
  // describe navigational properties here
}

export type AcademyWithRelations = Academy & AcademyRelations;
