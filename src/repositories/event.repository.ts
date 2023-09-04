import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
  BelongsToAccessor,
} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Event, EventRelations, Match, Championship} from '../models';
import {MatchRepository} from './match.repository';
import {ChampionshipRepository} from './championship.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {
  public readonly matches: HasManyRepositoryFactory<
    Match,
    typeof Event.prototype.id
  >;

  public readonly championship: BelongsToAccessor<
    Championship,
    typeof Event.prototype.id
  >;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource,
    @repository.getter('MatchRepository')
    protected matchRepositoryGetter: Getter<MatchRepository>,
    @repository.getter('ChampionshipRepository')
    protected championshipRepositoryGetter: Getter<ChampionshipRepository>,
  ) {
    super(Event, dataSource);
    this.championship = this.createBelongsToAccessorFor(
      'championship',
      championshipRepositoryGetter,
    );
    this.registerInclusionResolver(
      'championship',
      this.championship.inclusionResolver,
    );
    this.matches = this.createHasManyRepositoryFactoryFor(
      'matches',
      matchRepositoryGetter,
    );
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
  }
}
