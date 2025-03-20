import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 64).notNullable();
    table.string('description', 2048).notNullable();
    table.text('image', 'longtext').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('stock').notNullable().checkPositive();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cart').dropTable('products');
}
