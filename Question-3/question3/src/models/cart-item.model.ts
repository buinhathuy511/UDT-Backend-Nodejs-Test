import {Entity, model, property} from '@loopback/repository';

@model()
export class CartItem extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  cart_item_id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cart_id: string;

  @property({
    type: 'string',
    required: true,
  })
  product_id: string;

  @property({
    type: 'number',
  })
  quantity?: number;


  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {
  // describe navigational properties here
}

export type CartItemWithRelations = CartItem & CartItemRelations;
