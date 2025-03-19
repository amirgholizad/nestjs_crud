import { ApiProperty } from '@nestjs/swagger';

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
}

export class AddToCartDTO {
  @ApiProperty({ example: 2 })
  product_id: number;

  @ApiProperty({ example: 3 })
  quantity: number;
}
