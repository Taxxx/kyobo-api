import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Championship, ChampionshipRelations, Event} from '../models';
import {EventRepository} from './event.repository';

export class ChampionshipRepository extends DefaultCrudRepository<
  Championship,
  typeof Championship.prototype.id,
  ChampionshipRelations
> {

  public readonly MyChampionshipId: HasManyRepositoryFactory<Event, typeof Championship.prototype.id>;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>,
  ) {
    super(Championship, dataSource);
    this.MyChampionshipId = this.createHasManyRepositoryFactoryFor('MyChampionshipId', eventRepositoryGetter,);
    this.registerInclusionResolver('MyChampionshipId', this.MyChampionshipId.inclusionResolver);
  }
}
