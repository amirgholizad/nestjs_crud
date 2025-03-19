import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { KnexModule } from 'nest-knexjs';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql2',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          database: 'final_commerce',
          user: 'root',
          password: 'rootroot',
          host: 'localhost',
          port: 3307,
          ssl: false,
        },
      },
    }),
    ProductsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
