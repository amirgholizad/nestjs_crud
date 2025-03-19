import { Body, Injectable, Param } from '@nestjs/common';
import { Cart } from '../dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class CartService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async fetchCart() {
    const cart = await this.knex.table('cart');
    return { cart };
  }

  async deleteCart() {
    return this.knex('cart').truncate();
  }

  async addToCart(data: Omit<Cart, 'id' | 'createdAt' | 'updatedAt'>) {
    const cart = await this.knex
      .table('cart')
      .where({ product_id: data.product_id });
    if (cart.length) {
      return this.knex('cart')
        .where({ product_id: data.product_id })
        .increment('quantity', data.quantity);
    }
    return this.knex('cart').insert(data);
  }

  async reduceFromCart(product_id: number) {
    const cartDetail = await this.knex('cart').where({
      product_id: product_id,
    });

    if (cartDetail[0].quantity === 1) {
      return this.knex('cart').where({ product_id: product_id }).delete();
    } else {
      return this.knex('cart')
        .where({ product_id: product_id })
        .decrement('quantity', 1);
    }
  }

  async removeFromCart(product_id: number) {
    return this.knex('cart').where({ product_id: product_id }).delete();
  }
}
