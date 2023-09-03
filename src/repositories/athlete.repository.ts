import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Athlete, AthleteRelations} from '../models';

export class AthleteRepository extends DefaultCrudRepository<
  Athlete,
  typeof Athlete.prototype.id,
  AthleteRelations
> {
  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource,
  ) {
    super(Athlete, dataSource);
  }
}
