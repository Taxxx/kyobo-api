import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Athlete,
  Team,
} from '../models';
import {AthleteRepository} from '../repositories';

export class AthleteTeamController {
  constructor(
    @repository(AthleteRepository)
    public athleteRepository: AthleteRepository,
  ) { }

  @get('/athletes/{id}/team', {
    responses: {
      '200': {
        description: 'Team belonging to Athlete',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Team),
          },
        },
      },
    },
  })
  async getTeam(
    @param.path.number('id') id: typeof Athlete.prototype.id,
  ): Promise<Team> {
    return this.athleteRepository.team(id);
  }
}
