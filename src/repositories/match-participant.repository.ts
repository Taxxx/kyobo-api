import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {MatchParticipant, MatchParticipantRelations, Athlete, Team} from '../models';
import {AthleteRepository} from './athlete.repository';
import {TeamRepository} from './team.repository';

export class MatchParticipantRepository extends DefaultCrudRepository<
  MatchParticipant,
  typeof MatchParticipant.prototype.id,
  MatchParticipantRelations
> {

  public readonly athlete: BelongsToAccessor<Athlete, typeof MatchParticipant.prototype.id>;

  public readonly team: BelongsToAccessor<Team, typeof MatchParticipant.prototype.id>;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource, @repository.getter('AthleteRepository') protected athleteRepositoryGetter: Getter<AthleteRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>,
  ) {
    super(MatchParticipant, dataSource);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.registerInclusionResolver('team', this.team.inclusionResolver);
    this.athlete = this.createBelongsToAccessorFor('athlete', athleteRepositoryGetter,);
    this.registerInclusionResolver('athlete', this.athlete.inclusionResolver);
  }
}
