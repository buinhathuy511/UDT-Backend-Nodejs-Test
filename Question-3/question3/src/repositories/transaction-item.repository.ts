import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TransactionItem, TransactionItemRelations} from '../models';

export class TransactionItemRepository extends DefaultCrudRepository<
  TransactionItem,
  typeof TransactionItem.prototype.transaction_item_id,
  TransactionItemRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TransactionItem, dataSource);
  }
}
