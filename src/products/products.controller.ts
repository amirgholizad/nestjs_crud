import { ProductsService } from './products.service';
import { Controller, Get } from '@nestjs/common';
import { Param, ParseIntPipe } from '@nestjs/common';

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
}
