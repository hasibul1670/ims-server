# IMS Server - Inventory Management System

A NestJS-based API server for Inventory Management System with Prisma ORM and PostgreSQL database.

## Features

- **Product Management**: Complete CRUD operations for products
- **Database**: PostgreSQL with Prisma ORM
- **API Documentation**: Swagger/OpenAPI documentation
- **Validation**: Input validation with class-validator
- **Type Safety**: Full TypeScript support
- **Architecture**: Modular NestJS structure

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **Documentation**: Swagger/OpenAPI
- **Validation**: class-validator, class-transformer

## Project Structure

```
src/
├── app.module.ts           # Main application module
├── main.ts                 # Application entry point
├── prisma/                 # Prisma configuration
│   ├── prisma.service.ts   # Prisma database service
│   └── prisma.module.ts    # Prisma module
├── product/                # Product module
│   ├── dto/                # Data Transfer Objects
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   ├── product.controller.ts  # Product REST controller
│   ├── product.service.ts     # Product business logic
│   └── product.module.ts      # Product module
└── generated/              # Generated Prisma client
    └── prisma/
```

## Prisma Schema

The Product model includes the following fields:

- `id`: Unique identifier (CUID)
- `name`: Product name (required)
- `description`: Product description (optional)
- `sku`: Stock Keeping Unit (unique, required)
- `price`: Product price (decimal, 10,2)
- `quantity`: Current stock quantity (default: 0)
- `category`: Product category (optional)
- `brand`: Product brand (optional)
- `isActive`: Product status (default: true)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- pnpm (recommended) or npm

### 1. Clone and Install Dependencies

```bash
cd server
pnpm install
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE ims_db;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE ims_db TO postgres;
```

### 3. Environment Configuration

Update the `.env` file with your database configuration:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ims_db?schema=public"
PORT=3000
```

### 4. Database Migration

Generate and run database migrations:

```bash
pnpm prisma migrate dev --name init
```

Generate Prisma client:

```bash
pnpm prisma generate
```

### 5. Run the Application

Development mode:
```bash
pnpm run start:dev
```

Production mode:
```bash
pnpm run build
pnpm run start:prod
```

## API Documentation

Once the application is running, visit:

- **Swagger UI**: http://localhost:3000/api
- **API Base URL**: http://localhost:3000

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all active products |
| GET | `/products/:id` | Get product by ID |
| GET | `/products/sku/:sku` | Get product by SKU |
| POST | `/products` | Create new product |
| PATCH | `/products/:id` | Update product |
| PATCH | `/products/:id/quantity` | Update product quantity |
| PATCH | `/products/:id/soft-delete` | Deactivate product |
| DELETE | `/products/:id` | Delete product |

### Example Request Bodies

#### Create Product
```json
{
  "name": "Laptop Pro",
  "description": "High-performance laptop",
  "sku": "LP-001",
  "price": 999.99,
  "quantity": 10,
  "category": "Electronics",
  "brand": "TechBrand"
}
```

#### Update Product
```json
{
  "name": "Laptop Pro Updated",
  "price": 899.99
}
```

## Database Commands

```bash
# Create new migration
pnpm prisma migrate dev --name migration_name

# Reset database
pnpm prisma migrate reset

# View database
pnpm prisma studio

# Generate client
pnpm prisma generate
```

## Development

### Adding New Models

1. Update `prisma/schema.prisma` with your new model
2. Run migration: `pnpm prisma migrate dev --name add_new_model`
3. Generate client: `pnpm prisma generate`
4. Create module, service, controller, and DTOs following the product pattern

### Code Quality

```bash
# Linting
pnpm run lint

# Formatting
pnpm run format

# Testing
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```

## Error Handling

The API includes comprehensive error handling:

- **400**: Validation errors
- **404**: Resource not found
- **409**: Duplicate resources (e.g., duplicate SKU)
- **500**: Internal server errors

## Contributing

1. Follow the existing code structure
2. Add proper validation to all DTOs
3. Include Swagger documentation for all endpoints
4. Write tests for new features
5. Update documentation

## License

This project is licensed under the UNLICENSED license.
