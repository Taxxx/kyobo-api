import {repository} from '@loopback/repository';
import {param, get, getModelSchemaRef} from '@loopback/rest';
import {Athlete, Academy} from '../models';
import {AthleteRepository} from '../repositories';

export class AthleteAcademyController {
  constructor(
    @repository(AthleteRepository)
    public athleteRepository: AthleteRepository,
  ) {}

  @get('/athletes/{id}/academy', {
    responses: {
      '200': {
        description: 'Academy belonging to Athlete',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Academy),
          },
        },
      },
    },
  })
  async getAcademy(
    @param.path.number('id') id: typeof Athlete.prototype.id,
  ): Promise<Academy> {
    return this.athleteRepository.academy(id);
  }
}
