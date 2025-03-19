import { Controller, Get, Put, Body, Post, Delete } from '@nestjs/common';
import { Param, ParseIntPipe } from '@nestjs/common';
import { Cart } from '../dto';
import { CartService } from './cart.service';

type AddToCartDTO = Omit<Cart, 'id' | 'createdAt' | 'updatedAt'>;

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart() {
    return await this.cartService.fetchCart();
  }

  @Delete()
  async removeCart() {
    return await this.cartService.deleteCart();
  }

  @Post()
  async addProductToCart(@Body() data: AddToCartDTO) {
    return await this.cartService.addToCart(data);
  }

  @Delete(':id')
  async removeProductFromCart(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AddToCartDTO,
  ) {
    return await this.cartService.removeFromCart(data);
  }

  @Put(':id')
  async reduceProductFromCart(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AddToCartDTO,
  ) {
    return await this.cartService.reduceFromCart(data);
  }
}
