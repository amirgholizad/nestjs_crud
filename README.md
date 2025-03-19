# CRUD App with Nest.js, Knex.js, and MySQL

This is a simple CRUD application for managing products and a shopping cart using Nest.js, Knex.js, and MySQL. The app provides functionalities for adding, editing, deleting, and viewing products and items in the shopping cart.

## Features

- CRUD operations for products
- CRUD operations for shopping cart management
- Dockerized application for easy deployment

## Prerequisites

- Docker
- Docker Compose

## Getting Started

To run the app, follow these steps:

### 1. Switch to the Production Branch

Ensure you're on the production branch:

```bash
git checkout production
```

### 2. Download the Project

Clone the repository to your local machine:

```bash
git clone https://github.com/amirgholizad/nestjs_crud.git
```

### 3. Build and Run with Docker Compose

Navigate to the project directory and use the following command to build and start the application:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

This will build and start the containers as defined in the `docker-compose.prod.yml` file.

### 4. (Optional) Ensure No Existing Containers

If you want to ensure that no existing containers are running, you can shut down any running containers with the following command:

```bash
docker-compose down -v
```

This will stop and remove the containers, volumes, and networks, ensuring a fresh start before building the app again.

## API Endpoints

- **GET /products**: Fetch all products
- **POST /products**: Add a new product
- **PUT /products/:id**: Update a product by ID
- **DELETE /products/:id**: Delete a product by ID

- **GET /cart**: Fetch all items in the shopping cart
- **POST /cart**: Add an item to the shopping cart
- **DELETE /cart/:product_id**: Remove an item from the shopping cart
- **PUT /cart/:product_id**:
  Reduce the number of a product in the cart by 1
