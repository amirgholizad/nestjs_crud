import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class Product {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Laptop' })
  name: string;

  @ApiProperty({ example: 999.99 })
  price: number;

  @ApiProperty({ example: 10 })
  stock: number;

  @ApiProperty({ example: 'High-end gaming laptop' })
  description: string;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  updatedAt: string;

  @ApiProperty({ example: 'image.jpg' })
  image: string;
}

export class Cart {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 2 })
  product_id: number;

  @ApiProperty({ example: 3 })
  quantity: number;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  createdAt: string;

  @ApiProperty({ example: '2024-03-19T12:00:00Z' })
  updatedAt: string;
}

export class CreateProductDTO {
  @ApiProperty({ example: 'Laptop' })
  name: string;

  @ApiProperty({ example: 999.99 })
  price: number;

  @ApiProperty({ example: 10 })
  stock: number;

  @ApiProperty({ example: 'High-end gaming laptop' })
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Product image',
  })
  @IsOptional()
  image?: string;
}

export class AddToCartDTO {
  @ApiProperty({ example: 2 })
  product_id: number;

  @ApiProperty({ example: 3 })
  quantity: number;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Product image',
  })
  @IsOptional()
  @IsString()
  image?: string;
}
