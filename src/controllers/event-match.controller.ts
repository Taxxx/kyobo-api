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
  Event,
  Match,
} from '../models';
import {EventRepository} from '../repositories';

export class EventMatchController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) { }

  @get('/events/{id}/matches', {
    responses: {
      '200': {
        description: 'Array of Event has many Match',
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
    return this.eventRepository.matches(id).find(filter);
  }

  @post('/events/{id}/matches', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(Match)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Match, {
            title: 'NewMatchInEvent',
            exclude: ['id'],
            optional: ['eventId']
          }),
        },
      },
    }) match: Omit<Match, 'id'>,
  ): Promise<Match> {
    return this.eventRepository.matches(id).create(match);
  }

  @patch('/events/{id}/matches', {
    responses: {
      '200': {
        description: 'Event.Match PATCH success count',
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
    return this.eventRepository.matches(id).patch(match, where);
  }

  @del('/events/{id}/matches', {
    responses: {
      '200': {
        description: 'Event.Match DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Match)) where?: Where<Match>,
  ): Promise<Count> {
    return this.eventRepository.matches(id).delete(where);
  }
}
