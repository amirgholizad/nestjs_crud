import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      database: 'final_commerce',
      user: 'root',
      password: 'rootroot',
      host: 'localhost',
      port: 3307,
      ssl: false,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'mysql2',
    connection: {
      database: 'final_commerce',
      user: 'root',
      password: 'rootroot',
      host: 'localhost',
      port: 3307,
      ssl: false,
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default config;
