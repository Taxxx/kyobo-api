import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Championship, ChampionshipRelations, Event} from '../models';
import {EventRepository} from './event.repository';

export class ChampionshipRepository extends DefaultCrudRepository<
  Championship,
  typeof Championship.prototype.id,
  ChampionshipRelations
> {

  public readonly events: HasManyRepositoryFactory<Event, typeof Championship.prototype.id>;

  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource, @repository.getter('EventRepository') protected eventRepositoryGetter: Getter<EventRepository>,
  ) {
    super(Championship, dataSource);
    this.events = this.createHasManyRepositoryFactoryFor('events', eventRepositoryGetter,);
    this.registerInclusionResolver('events', this.events.inclusionResolver);
  }
}
