# Installation Guide

## Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** v9+ (comes with Node.js)
- **PostgreSQL** 12+ (optional, currently using in-memory storage)
- **Docker** (optional, for PostgreSQL container)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- NestJS framework
- TypeORM
- JWT authentication
- Swagger documentation
- And more...

## Step 3: Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your `.env` file:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=blog_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Step 4: Database Setup (Optional)

### Option A: Using Docker (Recommended)

```bash
docker run --name blog-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:latest
```

### Option B: Local PostgreSQL

1. Install PostgreSQL
2. Create a database: `CREATE DATABASE blog_db;`
3. Update `.env` with your credentials

### Option C: In-Memory (No Database)

Leave the database commented out in `src/app.module.ts` (already done by default).

## Step 5: Start Development Server

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`

**Output should show:**
```
🚀 Application is running on: http://localhost:3000
📚 Swagger docs: http://localhost:3000/api
```

## Step 6: Access the API

- **API Endpoint**: `http://localhost:3000`
- **Swagger UI**: `http://localhost:3000/api`
- **Health Check**: `http://localhost:3000`

## Available Scripts

```bash
# Development with watch mode
npm run start:dev

# Production build
npm run build

# Run production build
npm run start:prod

# Lint code
npm run lint

# Run tests (when added)
npm test
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -i :3000
kill -9 <PID>
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Failed

Make sure PostgreSQL is running:

```bash
# Check PostgreSQL status
# macOS:
brew services list

# Windows (if using PostgreSQL installer):
services.msc
```

### TypeScript Compilation Errors

```bash
# Clear build cache
npm run build

# Check TypeScript version
tsc --version
```

## Next Steps

1. Read the [API Documentation](./README.md#api-endpoints)
2. Check out [Contributing Guidelines](./CONTRIBUTING.md)
3. Explore the [Project Structure](./README.md#project-structure)
4. Try the [Swagger UI](http://localhost:3000/api)

## Need Help?

- Check existing [Issues](https://github.com/yourusername/blog-api/issues)
- Create a new [Discussion](https://github.com/yourusername/blog-api/discussions)
- Read the [Contributing Guide](./CONTRIBUTING.md)

Happy coding! 🚀
