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
  Academy,
  Team,
} from '../models';
import {AcademyRepository} from '../repositories';

export class AcademyTeamController {
  constructor(
    @repository(AcademyRepository) protected academyRepository: AcademyRepository,
  ) { }

  @get('/academies/{id}/teams', {
    responses: {
      '200': {
        description: 'Array of Academy has many Team',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Team)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Team>,
  ): Promise<Team[]> {
    return this.academyRepository.teams(id).find(filter);
  }

  @post('/academies/{id}/teams', {
    responses: {
      '200': {
        description: 'Academy model instance',
        content: {'application/json': {schema: getModelSchemaRef(Team)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Academy.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {
            title: 'NewTeamInAcademy',
            exclude: ['id'],
            optional: ['academyId']
          }),
        },
      },
    }) team: Omit<Team, 'id'>,
  ): Promise<Team> {
    return this.academyRepository.teams(id).create(team);
  }

  @patch('/academies/{id}/teams', {
    responses: {
      '200': {
        description: 'Academy.Team PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {partial: true}),
        },
      },
    })
    team: Partial<Team>,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.academyRepository.teams(id).patch(team, where);
  }

  @del('/academies/{id}/teams', {
    responses: {
      '200': {
        description: 'Academy.Team DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.academyRepository.teams(id).delete(where);
  }
}
