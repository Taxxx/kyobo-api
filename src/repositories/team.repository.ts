import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Team, TeamRelations, Athlete} from '../models';
import {AthleteRepository} from './athlete.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {
  public readonly athletes: HasManyRepositoryFactory<
    Athlete,
    typeof Team.prototype.id
  >;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource,
    @repository.getter('AthleteRepository')
    protected athleteRepositoryGetter: Getter<AthleteRepository>,
  ) {
    super(Team, dataSource);
    this.athletes = this.createHasManyRepositoryFactoryFor(
      'athletes',
      athleteRepositoryGetter,
    );
    this.registerInclusionResolver('athletes', this.athletes.inclusionResolver);
  }
}
