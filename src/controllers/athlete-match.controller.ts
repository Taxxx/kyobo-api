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
import {Athlete, Match} from '../models';
import {AthleteRepository} from '../repositories';

export class AthleteMatchController {
  constructor(
    @repository(AthleteRepository)
    protected athleteRepository: AthleteRepository,
  ) {}

  @get('/athletes/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Athlete has many Match through MatchParticipant',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Match)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Match>,
  ): Promise<Match[]> {
    return this.athleteRepository.matches(id).find(filter);
  }

  @post('/athletes/{id}/matches', {
    responses: {
      '200': {
        description: 'create a Match model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Athlete.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInAthlete',
            exclude: ['id'],
          }),
        },
      },
    })
    match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.athleteRepository.matches(id).create(match);
  }

  @patch('/athletes/{id}/matches', {
    responses: {
      '200': {
        description: 'Athlete.Match PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {partial: true}),
        },
      },
    })
    match: Partial<Match>,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.athleteRepository.matches(id).patch(match, where);
  }

  @del('/athletes/{id}/matches', {
    responses: {
      '200': {
        description: 'Athlete.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.athleteRepository.matches(id).delete(where);
  }
}
