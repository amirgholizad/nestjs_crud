import { ProductsService } from './products.service';
import { Controller, Get, Put, Body, Post } from '@nestjs/common';
import { Param, ParseIntPipe } from '@nestjs/common';
import { Product } from '../dt';

type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return await this.productsService.listAll();
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.getProductById(id);
  }

  @Post()
  async upsertProduct(@Body() data: CreateProductDTO) {
    return this.productsService.addProduct(data);
  }
}
