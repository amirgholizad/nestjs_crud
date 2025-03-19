import { Body, Injectable, Param } from '@nestjs/common';
import { CreateProductDTO, Product } from '../dto';
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

  async addProduct(data: CreateProductDTO) {
    return this.knex('products').insert(data).onConflict('name').merge();
  }

  async deleteProduct(id: number) {
    return this.knex('products').where({ id }).delete();
  }

  async updateProduct(id: number, data: CreateProductDTO) {
    return this.knex('products').where({ id }).update(data);
  }
}
