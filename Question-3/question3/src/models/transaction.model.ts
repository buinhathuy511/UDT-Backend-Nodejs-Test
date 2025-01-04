import {Entity, model, property} from '@loopback/repository';

@model()
export class Transaction extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  transaction_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  customer_id: string;

  @property({
    type: 'string',
    required: true,
  })
  agency_id: string;

  @property({
    type: 'number',
  })
  amount?: number;

  @property({
    type: 'date',
  })
  transaction_date?: string;


  constructor(data?: Partial<Transaction>) {
    super(data);
  }
}

export interface TransactionRelations {
  // describe navigational properties here
}

export type TransactionWithRelations = Transaction & TransactionRelations;
