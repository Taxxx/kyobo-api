import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Athlete, AthleteRelations, Team} from '../models';
import {TeamRepository} from './team.repository';

export class AthleteRepository extends DefaultCrudRepository<
  Athlete,
  typeof Athlete.prototype.id,
  AthleteRelations
> {

  public readonly team: BelongsToAccessor<Team, typeof Athlete.prototype.id>;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>,
  ) {
    super(Athlete, dataSource);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.registerInclusionResolver('team', this.team.inclusionResolver);
  }
}
