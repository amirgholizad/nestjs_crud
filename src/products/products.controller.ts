import { ProductsService } from './products.service';
import {
  Controller,
  Get,
  Put,
  Body,
  Post,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { Param, ParseIntPipe } from '@nestjs/common';
import { CreateProductDTO } from '../dto';
import {
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiConsumes,
} from '@nestjs/swagger';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'List of all products' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllProducts() {
    return await this.productsService.listAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', type: Number })
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.getProductById(id);
    if (product.product.length > 0) {
      return product;
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', type: Number })
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const res = await this.productsService.deleteProduct(id);
    if (res) {
      return { message: 'Product deleted' };
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDTO })
  @ApiResponse({ status: 200, description: 'Product added' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addNewProduct(
    @Body() data: CreateProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image is required');
    }
    const MAX_SIZE = 1 * 1024 * 1024; // 1MB
    if (file.size > MAX_SIZE) {
      throw new BadRequestException('File size exceeds 1MB limit');
    }
    const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    data.image = base64String;

    const res = await this.productsService.addProduct(data);
    if (typeof res === 'number' || (res.length > 0 && res[0] > 0)) {
      return { message: 'Product added' };
    } else {
      throw new BadRequestException('Bad request');
    }
  }

  @Put(':id')
  @ApiBody({ type: CreateProductDTO })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', type: Number })
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateProductDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const MAX_SIZE = 1 * 1024 * 1024; // 1MB
      if (file.size > MAX_SIZE) {
        throw new BadRequestException('File size exceeds 1MB limit');
      }
      const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      data.image = base64String;
    }

    const res = await this.productsService.updateProduct(id, data);
    if (res) {
      return { message: 'Product updated' };
    } else {
      throw new NotFoundException('Product not found');
    }
  }
}
