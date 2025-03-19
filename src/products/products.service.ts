import { Body, Injectable, Param } from '@nestjs/common';
import { DatabaseModule as db } from 'src/database/database.module';
import { Product } from '../dt';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class ProductsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async listAll() {
    const products = await this.knex.table('products');
    return { products };
  }

  async getProductById(id: number) {
    const product = await this.knex.table('products').where({ id });
    return { product };
  }

  async addProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.knex('products').insert(data).onConflict('name').merge();
  }
}
