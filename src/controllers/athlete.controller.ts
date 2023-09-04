import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Athlete} from '../models';
import {AthleteRepository} from '../repositories';

export class AthleteController {
  constructor(
    @repository(AthleteRepository)
    public athleteRepository: AthleteRepository,
  ) {}

  @post('/athletes')
  @response(200, {
    description: 'Athlete model instance',
    content: {'application/json': {schema: getModelSchemaRef(Athlete)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Athlete, {
            title: 'NewAthlete',
            exclude: ['id'],
          }),
        },
      },
    })
    athlete: Omit<Athlete, 'id'>,
  ): Promise<Athlete> {
    return this.athleteRepository.create(athlete);
  }

  @get('/athletes/count')
  @response(200, {
    description: 'Athlete model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Athlete) where?: Where<Athlete>): Promise<Count> {
    return this.athleteRepository.count(where);
  }

  @get('/athletes')
  @response(200, {
    description: 'Array of Athlete model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Athlete, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Athlete) filter?: Filter<Athlete>,
  ): Promise<Athlete[]> {
    return this.athleteRepository.find(filter);
  }

  @patch('/athletes')
  @response(200, {
    description: 'Athlete PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Athlete, {partial: true}),
        },
      },
    })
    athlete: Athlete,
    @param.where(Athlete) where?: Where<Athlete>,
  ): Promise<Count> {
    return this.athleteRepository.updateAll(athlete, where);
  }

  @get('/athletes/{id}')
  @response(200, {
    description: 'Athlete model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Athlete, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Athlete, {exclude: 'where'})
    filter?: FilterExcludingWhere<Athlete>,
  ): Promise<Athlete> {
    return this.athleteRepository.findById(id, filter);
  }

  @patch('/athletes/{id}')
  @response(204, {
    description: 'Athlete PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Athlete, {partial: true}),
        },
      },
    })
    athlete: Athlete,
  ): Promise<void> {
    await this.athleteRepository.updateById(id, athlete);
  }

  @put('/athletes/{id}')
  @response(204, {
    description: 'Athlete PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() athlete: Athlete,
  ): Promise<void> {
    await this.athleteRepository.replaceById(id, athlete);
  }

  @del('/athletes/{id}')
  @response(204, {
    description: 'Athlete DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.athleteRepository.deleteById(id);
  }
}
