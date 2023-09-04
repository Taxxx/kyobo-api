import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Team, TeamRelations} from '../models';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {
  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource,
  ) {
    super(Team, dataSource);
  }
}
