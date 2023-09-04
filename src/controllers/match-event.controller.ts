import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Match, Event} from '../models';
import {MatchRepository} from '../repositories';

export class MatchEventController {
  constructor(
    @repository(MatchRepository)
    public matchRepository: MatchRepository,
  ) {}

  @get('/matches/{id}/event', {
    responses: {
      '200': {
        description: 'Event belonging to Match',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Event),
          },
        },
      },
    },
  })
  async getEvent(
    @param.path.number('id') id: typeof Match.prototype.id,
  ): Promise<Event> {
    return this.matchRepository.event(id);
  }
}
