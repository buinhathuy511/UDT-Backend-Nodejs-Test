import {Entity, model, property} from '@loopback/repository';

@model()
export class Billing extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  billing_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  transaction_id: string;

  @property({
    type: 'number',
  })
  total_amount?: number;


  constructor(data?: Partial<Billing>) {
    super(data);
  }
}

export interface BillingRelations {
  // describe navigational properties here
}

export type BillingWithRelations = Billing & BillingRelations;
