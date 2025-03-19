#!/bin/sh

echo "Running migrations..."
NODE_ENV=production npx knex migrate:latest
NODE_ENV=production npx knex seed:run

echo "Starting app..."
exec npm run start:prod