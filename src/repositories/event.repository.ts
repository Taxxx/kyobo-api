import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Event, EventRelations} from '../models';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {
  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource,
  ) {
    super(Event, dataSource);
  }
}
