import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Billing, BillingRelations} from '../models';

export class BillingRepository extends DefaultCrudRepository<
  Billing,
  typeof Billing.prototype.billing_id,
  BillingRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Billing, dataSource);
  }
}
