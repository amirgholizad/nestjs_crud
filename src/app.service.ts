import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello From Amir!!! Checkout the API Documentation at "/api"';
  }
}

export class ProductController {
  constructor(@InjectConnection() private readonly knex: Knex) {}
}
