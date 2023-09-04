import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Athlete, AthleteRelations, Team, Academy} from '../models';
import {TeamRepository} from './team.repository';
import {AcademyRepository} from './academy.repository';

export class AthleteRepository extends DefaultCrudRepository<
  Athlete,
  typeof Athlete.prototype.id,
  AthleteRelations
> {

  public readonly team: BelongsToAccessor<Team, typeof Athlete.prototype.id>;

  public readonly academy: BelongsToAccessor<Academy, typeof Athlete.prototype.id>;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>, @repository.getter('AcademyRepository') protected academyRepositoryGetter: Getter<AcademyRepository>,
  ) {
    super(Athlete, dataSource);
    this.academy = this.createBelongsToAccessorFor('academy', academyRepositoryGetter,);
    this.registerInclusionResolver('academy', this.academy.inclusionResolver);
    this.team = this.createBelongsToAccessorFor('team', teamRepositoryGetter,);
    this.registerInclusionResolver('team', this.team.inclusionResolver);
  }
}
