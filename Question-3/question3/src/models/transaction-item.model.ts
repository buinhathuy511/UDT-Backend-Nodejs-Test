import {Entity, model, property} from '@loopback/repository';

@model()
export class TransactionItem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  transaction_item_id?: string;

  @property({
    type: 'string',
  })
  transaction_id?: string;

  @property({
    type: 'string',
  })
  product_id?: string;

  @property({
    type: 'number',
  })
  quantity?: number;

  @property({
    type: 'number',
  })
  total_amount: number;

  constructor(data?: Partial<TransactionItem>) {
    super(data);
  }
}

export interface TransactionItemRelations {
  // describe navigational properties here
}

export type TransactionItemWithRelations = TransactionItem &
  TransactionItemRelations;
