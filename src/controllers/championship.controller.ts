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
import {Championship} from '../models';
import {ChampionshipRepository} from '../repositories';

export class ChampionshipController {
  constructor(
    @repository(ChampionshipRepository)
    public championshipRepository : ChampionshipRepository,
  ) {}

  @post('/championships')
  @response(200, {
    description: 'Championship model instance',
    content: {'application/json': {schema: getModelSchemaRef(Championship)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Championship, {
            title: 'NewChampionship',
            exclude: ['id'],
          }),
        },
      },
    })
    championship: Omit<Championship, 'id'>,
  ): Promise<Championship> {
    return this.championshipRepository.create(championship);
  }

  @get('/championships/count')
  @response(200, {
    description: 'Championship model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Championship) where?: Where<Championship>,
  ): Promise<Count> {
    return this.championshipRepository.count(where);
  }

  @get('/championships')
  @response(200, {
    description: 'Array of Championship model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Championship, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Championship) filter?: Filter<Championship>,
  ): Promise<Championship[]> {
    return this.championshipRepository.find(filter);
  }

  @patch('/championships')
  @response(200, {
    description: 'Championship PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Championship, {partial: true}),
        },
      },
    })
    championship: Championship,
    @param.where(Championship) where?: Where<Championship>,
  ): Promise<Count> {
    return this.championshipRepository.updateAll(championship, where);
  }

  @get('/championships/{id}')
  @response(200, {
    description: 'Championship model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Championship, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Championship, {exclude: 'where'}) filter?: FilterExcludingWhere<Championship>
  ): Promise<Championship> {
    return this.championshipRepository.findById(id, filter);
  }

  @patch('/championships/{id}')
  @response(204, {
    description: 'Championship PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Championship, {partial: true}),
        },
      },
    })
    championship: Championship,
  ): Promise<void> {
    await this.championshipRepository.updateById(id, championship);
  }

  @put('/championships/{id}')
  @response(204, {
    description: 'Championship PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() championship: Championship,
  ): Promise<void> {
    await this.championshipRepository.replaceById(id, championship);
  }

  @del('/championships/{id}')
  @response(204, {
    description: 'Championship DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.championshipRepository.deleteById(id);
  }
}
