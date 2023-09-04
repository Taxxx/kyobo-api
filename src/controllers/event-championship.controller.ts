import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Event, Championship} from '../models';
import {EventRepository} from '../repositories';

export class EventChampionshipController {
  constructor(
    @repository(EventRepository)
    public eventRepository: EventRepository,
  ) {}

  @get('/events/{id}/championship', {
    responses: {
      '200': {
        description: 'Championship belonging to Event',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Championship),
          },
        },
      },
    },
  })
  async getChampionship(
    @param.path.number('id') id: typeof Event.prototype.id,
  ): Promise<Championship> {
    return this.eventRepository.championship(id);
  }
}
