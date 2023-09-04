import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {KyoDbDataSource} from '../datasources';
import {Academy, AcademyRelations} from '../models';

export class AcademyRepository extends DefaultCrudRepository<
  Academy,
  typeof Academy.prototype.id,
  AcademyRelations
> {
  constructor(
    @inject('datasources.kyo_db') dataSource: KyoDbDataSource,
  ) {
    super(Academy, dataSource);
  }
}
