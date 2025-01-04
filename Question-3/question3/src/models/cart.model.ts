import {Entity, model, property} from '@loopback/repository';

@model()
export class Cart extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  cart_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  customer_id: string;


  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

export interface CartRelations {
  // describe navigational properties here
}

export type CartWithRelations = Cart & CartRelations;
