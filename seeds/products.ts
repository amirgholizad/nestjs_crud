import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    {
      name: 'Pie',
      description: "it's a pie!",
      price: 19.99,
      stock: 100,
    },
    {
      name: 'Chocolate bar',
      description: "it's a chocolate bar!",
      price: 29.99,
      stock: 50,
    },
    {
      name: 'Biscuits',
      description: 'biscuits!!!',
      price: 9.99,
      stock: 200,
    },
  ]);
}
