import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {MatchParticipant, Athlete} from '../models';
import {MatchParticipantRepository} from '../repositories';

export class MatchParticipantAthleteController {
  constructor(
    @repository(MatchParticipantRepository)
    public matchParticipantRepository: MatchParticipantRepository,
  ) {}

  @get('/match-participants/{id}/athlete', {
    responses: {
      '200': {
        description: 'Athlete belonging to MatchParticipant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Athlete),
          },
        },
      },
    },
  })
  async getAthlete(
    @param.path.number('id') id: typeof MatchParticipant.prototype.id,
  ): Promise<Athlete> {
    return this.matchParticipantRepository.athlete(id);
  }
}
