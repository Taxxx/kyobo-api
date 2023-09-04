import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MatchParticipant,
  Team,
} from '../models';
import {MatchParticipantRepository} from '../repositories';

export class MatchParticipantTeamController {
  constructor(
    @repository(MatchParticipantRepository)
    public matchParticipantRepository: MatchParticipantRepository,
  ) { }

  @get('/match-participants/{id}/team', {
    responses: {
      '200': {
        description: 'Team belonging to MatchParticipant',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Team),
          },
        },
      },
    },
  })
  async getTeam(
    @param.path.number('id') id: typeof MatchParticipant.prototype.id,
  ): Promise<Team> {
    return this.matchParticipantRepository.team(id);
  }
}
