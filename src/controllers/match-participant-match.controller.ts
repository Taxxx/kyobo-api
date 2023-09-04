import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {MatchParticipant, Match} from '../models';
import {MatchParticipantRepository} from '../repositories';

export class MatchParticipantMatchController {
  constructor(
    @repository(MatchParticipantRepository)
    public matchParticipantRepository: MatchParticipantRepository,
  ) {}

  @get('/match-participants/{id}/match', {
    responses: {
      '200': {
        description: 'Match belonging to MatchParticipant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Match),
          },
        },
      },
    },
  })
  async getMatch(
    @param.path.number('id') id: typeof MatchParticipant.prototype.id,
  ): Promise<Match> {
    return this.matchParticipantRepository.match(id);
  }
}
