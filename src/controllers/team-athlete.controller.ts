import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Team,
  Athlete,
} from '../models';
import {TeamRepository} from '../repositories';

export class TeamAthleteController {
  constructor(
    @repository(TeamRepository) protected teamRepository: TeamRepository,
  ) { }

  @get('/teams/{id}/athletes', {
    responses: {
      '200': {
        description: 'Array of Team has many Athlete',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Athlete)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Athlete>,
  ): Promise<Athlete[]> {
    return this.teamRepository.athletes(id).find(filter);
  }

  @post('/teams/{id}/athletes', {
    responses: {
      '200': {
        description: 'Team model instance',
        content: {'application/json': {schema: getModelSchemaRef(Athlete)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Team.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Athlete, {
            title: 'NewAthleteInTeam',
            exclude: ['id'],
            optional: ['teamId']
          }),
        },
      },
    }) athlete: Omit<Athlete, 'id'>,
  ): Promise<Athlete> {
    return this.teamRepository.athletes(id).create(athlete);
  }

  @patch('/teams/{id}/athletes', {
    responses: {
      '200': {
        description: 'Team.Athlete PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Athlete, {partial: true}),
        },
      },
    })
    athlete: Partial<Athlete>,
    @param.query.object('where', getWhereSchemaFor(Athlete)) where?: Where<Athlete>,
  ): Promise<Count> {
    return this.teamRepository.athletes(id).patch(athlete, where);
  }

  @del('/teams/{id}/athletes', {
    responses: {
      '200': {
        description: 'Team.Athlete DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Athlete)) where?: Where<Athlete>,
  ): Promise<Count> {
    return this.teamRepository.athletes(id).delete(where);
  }
}
