import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Academy, AcademyRelations, Athlete, Team} from '../models';
import {AthleteRepository} from './athlete.repository';
import {TeamRepository} from './team.repository';

export class AcademyRepository extends DefaultCrudRepository<
  Academy,
  typeof Academy.prototype.id,
  AcademyRelations
> {

  public readonly athletes: HasManyRepositoryFactory<Athlete, typeof Academy.prototype.id>;

  public readonly teams: HasManyRepositoryFactory<Team, typeof Academy.prototype.id>;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource, @repository.getter('AthleteRepository') protected athleteRepositoryGetter: Getter<AthleteRepository>, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>,
  ) {
    super(Academy, dataSource);
    this.teams = this.createHasManyRepositoryFactoryFor('teams', teamRepositoryGetter,);
    this.registerInclusionResolver('teams', this.teams.inclusionResolver);
    this.athletes = this.createHasManyRepositoryFactoryFor('athletes', athleteRepositoryGetter,);
    this.registerInclusionResolver('athletes', this.athletes.inclusionResolver);
  }
}
