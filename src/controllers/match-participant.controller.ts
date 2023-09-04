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
import {MatchParticipant} from '../models';
import {MatchParticipantRepository} from '../repositories';

export class MatchParticipantController {
  constructor(
    @repository(MatchParticipantRepository)
    public matchParticipantRepository: MatchParticipantRepository,
  ) {}

  @post('/match-participants')
  @response(200, {
    description: 'MatchParticipant model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(MatchParticipant)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchParticipant, {
            title: 'NewMatchParticipant',
            exclude: ['id'],
          }),
        },
      },
    })
    matchParticipant: Omit<MatchParticipant, 'id'>,
  ): Promise<MatchParticipant> {
    return this.matchParticipantRepository.create(matchParticipant);
  }

  @get('/match-participants/count')
  @response(200, {
    description: 'MatchParticipant model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MatchParticipant) where?: Where<MatchParticipant>,
  ): Promise<Count> {
    return this.matchParticipantRepository.count(where);
  }

  @get('/match-participants')
  @response(200, {
    description: 'Array of MatchParticipant model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MatchParticipant, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MatchParticipant) filter?: Filter<MatchParticipant>,
  ): Promise<MatchParticipant[]> {
    return this.matchParticipantRepository.find(filter);
  }

  @patch('/match-participants')
  @response(200, {
    description: 'MatchParticipant PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchParticipant, {partial: true}),
        },
      },
    })
    matchParticipant: MatchParticipant,
    @param.where(MatchParticipant) where?: Where<MatchParticipant>,
  ): Promise<Count> {
    return this.matchParticipantRepository.updateAll(matchParticipant, where);
  }

  @get('/match-participants/{id}')
  @response(200, {
    description: 'MatchParticipant model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MatchParticipant, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MatchParticipant, {exclude: 'where'})
    filter?: FilterExcludingWhere<MatchParticipant>,
  ): Promise<MatchParticipant> {
    return this.matchParticipantRepository.findById(id, filter);
  }

  @patch('/match-participants/{id}')
  @response(204, {
    description: 'MatchParticipant PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MatchParticipant, {partial: true}),
        },
      },
    })
    matchParticipant: MatchParticipant,
  ): Promise<void> {
    await this.matchParticipantRepository.updateById(id, matchParticipant);
  }

  @put('/match-participants/{id}')
  @response(204, {
    description: 'MatchParticipant PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() matchParticipant: MatchParticipant,
  ): Promise<void> {
    await this.matchParticipantRepository.replaceById(id, matchParticipant);
  }

  @del('/match-participants/{id}')
  @response(204, {
    description: 'MatchParticipant DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.matchParticipantRepository.deleteById(id);
  }
}
