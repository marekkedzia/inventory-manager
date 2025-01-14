# Simple Inventory Management System

## Features

### API Endpoints

#### Products

- **GET /products**: Retrieve a list of all products.
- **POST /products**: Create a new product. Required fields:
  - `name` (max length: 50)
  - `description` (max length: 50)
  - `price` (must be positive)
  - `stock` (must be a non-negative integer).

#### Stock Management

- **POST /products/:id/restock**: Increase the stock level of a product.
- **POST /products/:id/sell**: Decrease the stock level of a product, ensuring it cannot go below zero.

#### Order Management

- **POST /orders**: Create a new order with the following fields:
  - `customerId`
  - `products` (list of product IDs with quantities).
- Automatically updates stock levels when an order is placed.
- Prevents orders if stock is insufficient.

## Technical Stack

- **Backend**: [Node.js](https://nodejs.org) and [Express.js](https://expressjs.com).
- **Database**: [MongoDB](https://www.mongodb.com)
- **Architecture**: Implements the **CQRS pattern** for clear separation of commands and queries.
