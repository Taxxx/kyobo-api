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
import {Academy, Athlete} from '../models';
import {AcademyRepository} from '../repositories';

export class AcademyAthleteController {
  constructor(
    @repository(AcademyRepository)
    protected academyRepository: AcademyRepository,
  ) {}

  @get('/academies/{id}/athletes', {
    responses: {
      '200': {
        description: 'Array of Academy has many Athlete',
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
    return this.academyRepository.athletes(id).find(filter);
  }

  @post('/academies/{id}/athletes', {
    responses: {
      '200': {
        description: 'Academy model instance',
        content: {'application/json': {schema: getModelSchemaRef(Athlete)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Academy.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Athlete, {
            title: 'NewAthleteInAcademy',
            exclude: ['id'],
            optional: ['academyId'],
          }),
        },
      },
    })
    athlete: Omit<Athlete, 'id'>,
  ): Promise<Athlete> {
    return this.academyRepository.athletes(id).create(athlete);
  }

  @patch('/academies/{id}/athletes', {
    responses: {
      '200': {
        description: 'Academy.Athlete PATCH success count',
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
    @param.query.object('where', getWhereSchemaFor(Athlete))
    where?: Where<Athlete>,
  ): Promise<Count> {
    return this.academyRepository.athletes(id).patch(athlete, where);
  }

  @del('/academies/{id}/athletes', {
    responses: {
      '200': {
        description: 'Academy.Athlete DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Athlete))
    where?: Where<Athlete>,
  ): Promise<Count> {
    return this.academyRepository.athletes(id).delete(where);
  }
}
