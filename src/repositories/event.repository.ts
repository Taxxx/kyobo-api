import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Event, EventRelations, Match} from '../models';
import {MatchRepository} from './match.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly matches: HasManyRepositoryFactory<Match, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Event, dataSource);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
  }
}
