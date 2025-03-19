import { Controller, Get, Put, Body, Post, Delete } from '@nestjs/common';
import { Param, ParseIntPipe } from '@nestjs/common';
import { Cart, AddToCartDTO } from '../dto';
import { CartService } from './cart.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Shopping Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Cart details' })
  @ApiResponse({ status: 404, description: 'Cart is empty' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getCart() {
    const res = await this.cartService.fetchCart();
    if (res.cart.length > 0) {
      return res;
    } else if (res.cart.length === 0) {
      return { message: 'Cart is empty' };
    }
  }

  @Delete()
  @ApiResponse({ status: 200, description: 'Cart deleted' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async removeCart() {
    const res = await this.cartService.deleteCart();
    return { message: 'Cart deleted' };
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Product added to cart' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async addProductToCart(@Body() data: AddToCartDTO) {
    const res = await this.cartService.addToCart(data);
    if (res[0] > 0) {
      return { message: 'Product added to cart' };
    } else {
      return { message: 'Bad request' };
    }
  }

  @Delete(':product_id')
  @ApiResponse({ status: 200, description: 'Product removed from cart' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async removeProductFromCart(
    @Param('product_id', ParseIntPipe) product_id: number,
  ) {
    const res = await this.cartService.removeFromCart(product_id);
    if (res) {
      return { message: 'Product removed from cart' };
    } else {
      return { message: 'Product not found' };
    }
  }

  @Put(':product_id')
  @ApiResponse({ status: 200, description: 'Product quantity reduced' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async reduceProductFromCart(
    @Param('product_id', ParseIntPipe) product_id: number,
  ) {
    const res = await this.cartService.reduceFromCart(product_id);
    if (res) {
      return { message: 'Product quantity reduced' };
    } else {
      return { message: 'Product not found' };
    }
  }
}
