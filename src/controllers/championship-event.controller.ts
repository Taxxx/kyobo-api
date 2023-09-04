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
import {Championship, Event} from '../models';
import {ChampionshipRepository} from '../repositories';

export class ChampionshipEventController {
  constructor(
    @repository(ChampionshipRepository)
    protected championshipRepository: ChampionshipRepository,
  ) {}

  @get('/championships/{id}/events', {
    responses: {
      '200': {
        description: 'Array of Championship has many Event',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Event)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Event>,
  ): Promise<Event[]> {
    return this.championshipRepository.events(id).find(filter);
  }

  @post('/championships/{id}/events', {
    responses: {
      '200': {
        description: 'Championship model instance',
        content: {'application/json': {schema: getModelSchemaRef(Event)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Championship.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {
            title: 'NewEventInChampionship',
            exclude: ['id'],
            optional: ['championshipId'],
          }),
        },
      },
    })
    event: Omit<Event, 'id'>,
  ): Promise<Event> {
    return this.championshipRepository.events(id).create(event);
  }

  @patch('/championships/{id}/events', {
    responses: {
      '200': {
        description: 'Championship.Event PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Event, {partial: true}),
        },
      },
    })
    event: Partial<Event>,
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where<Event>,
  ): Promise<Count> {
    return this.championshipRepository.events(id).patch(event, where);
  }

  @del('/championships/{id}/events', {
    responses: {
      '200': {
        description: 'Championship.Event DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Event)) where?: Where<Event>,
  ): Promise<Count> {
    return this.championshipRepository.events(id).delete(where);
  }
}
