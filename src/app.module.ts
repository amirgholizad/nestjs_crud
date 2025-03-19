import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { KnexModule } from 'nest-knexjs';

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
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
