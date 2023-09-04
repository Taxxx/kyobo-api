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
import {Academy} from '../models';
import {AcademyRepository} from '../repositories';

export class AcademyController {
  constructor(
    @repository(AcademyRepository)
    public academyRepository : AcademyRepository,
  ) {}

  @post('/academies')
  @response(200, {
    description: 'Academy model instance',
    content: {'application/json': {schema: getModelSchemaRef(Academy)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Academy, {
            title: 'NewAcademy',
            exclude: ['id'],
          }),
        },
      },
    })
    academy: Omit<Academy, 'id'>,
  ): Promise<Academy> {
    return this.academyRepository.create(academy);
  }

  @get('/academies/count')
  @response(200, {
    description: 'Academy model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Academy) where?: Where<Academy>,
  ): Promise<Count> {
    return this.academyRepository.count(where);
  }

  @get('/academies')
  @response(200, {
    description: 'Array of Academy model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Academy, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Academy) filter?: Filter<Academy>,
  ): Promise<Academy[]> {
    return this.academyRepository.find(filter);
  }

  @patch('/academies')
  @response(200, {
    description: 'Academy PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Academy, {partial: true}),
        },
      },
    })
    academy: Academy,
    @param.where(Academy) where?: Where<Academy>,
  ): Promise<Count> {
    return this.academyRepository.updateAll(academy, where);
  }

  @get('/academies/{id}')
  @response(200, {
    description: 'Academy model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Academy, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Academy, {exclude: 'where'}) filter?: FilterExcludingWhere<Academy>
  ): Promise<Academy> {
    return this.academyRepository.findById(id, filter);
  }

  @patch('/academies/{id}')
  @response(204, {
    description: 'Academy PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Academy, {partial: true}),
        },
      },
    })
    academy: Academy,
  ): Promise<void> {
    await this.academyRepository.updateById(id, academy);
  }

  @put('/academies/{id}')
  @response(204, {
    description: 'Academy PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() academy: Academy,
  ): Promise<void> {
    await this.academyRepository.replaceById(id, academy);
  }

  @del('/academies/{id}')
  @response(204, {
    description: 'Academy DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.academyRepository.deleteById(id);
  }
}
