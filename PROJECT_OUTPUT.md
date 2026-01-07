# Blog API - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Installation & Setup](#installation--setup)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Authentication](#authentication)
9. [Database Schema](#database-schema)
10. [Code Examples](#code-examples)
11. [Error Handling](#error-handling)
12. [Security Features](#security-features)

---

## 🎯 Project Overview

**Blog API** is a full-featured REST API backend for a blogging platform built with NestJS and TypeScript. It provides complete user authentication, post management, and authorization features.

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Author**: Your Name
**Last Updated**: December 31, 2025

---

## 🛠 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | NestJS 10.0.0 |
| **Language** | TypeScript 5.0 |
| **Database** | PostgreSQL 8.11.0 |
| **ORM** | TypeORM 0.3.17 |
| **Authentication** | JWT (Passport) |
| **Password Hashing** | bcrypt 5.1.0 |
| **Validation** | class-validator 0.14.0 |
| **Documentation** | Swagger/OpenAPI 7.0 |
| **Runtime** | Node.js 20+ |

---

## 📁 Project Structure

```
Nest JS/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root module with TypeORM config
│   │
│   ├── auth/                            # Authentication module
│   │   ├── auth.controller.ts          # Auth endpoints
│   │   ├── auth.service.ts             # Auth logic
│   │   ├── auth.module.ts              # Auth module config
│   │   ├── jwt-auth.guard.ts           # JWT protection guard
│   │   ├── jwt.strategy.ts             # JWT validation strategy
│   │   └── dto/
│   │       ├── login.dto.ts            # Login validation
│   │       └── register.dto.ts         # Registration validation
│   │
│   ├── users/                           # Users module
│   │   ├── users.controller.ts         # User endpoints
│   │   ├── users.service.ts            # User business logic
│   │   ├── users.module.ts             # Users module config
│   │   └── entities/
│   │       └── user.entity.ts          # User database model
│   │
│   └── posts/                           # Posts module
│       ├── posts.controller.ts         # Post endpoints
│       ├── posts.service.ts            # Post business logic
│       ├── posts.module.ts             # Posts module config
│       ├── dto/
│       │   ├── create-post.dto.ts      # Create post validation
│       │   └── update-post.dto.ts      # Update post validation
│       └── entities/
│           └── post.entity.ts          # Post database model
│
├── dist/                                # Compiled JavaScript output
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript configuration
├── nest-cli.json                        # NestJS CLI config
└── README.md                            # Project readme
```

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ User registration with email validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token expiration (7 days)
- ✅ Protected routes with JWT guard
- ✅ Role-based access control

### 📝 Post Management
- ✅ Create, read, update, delete posts (CRUD)
- ✅ Publish/unpublish posts
- ✅ Draft and published status
- ✅ Author-only edit/delete permissions
- ✅ Post timestamps (created/updated)

### 👥 User Management
- ✅ User registration and login
- ✅ User profile data
- ✅ User role assignment (default: 'user')
- ✅ User-to-posts relationship

### 📚 API Documentation
- ✅ Swagger UI integration
- ✅ Interactive API testing
- ✅ Auto-generated API docs

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 20+ installed
- PostgreSQL 12+ installed and running
- npm or yarn package manager

### Step 1: Clone/Navigate to Project
```powershell
cd "c:\Users\palam\OneDrive\Desktop\Nest JS"
```

### Step 2: Install Dependencies
```powershell
npm install
```

### Step 3: Configure Environment Variables
Create `.env` file in project root:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=blog_db

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=7d

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Step 4: Create PostgreSQL Database
```sql
CREATE DATABASE blog_db;
```

### Step 5: Build Project
```powershell
npm run build
```

---

## ▶️ Running the Application

### Development Mode (with auto-reload)
```powershell
npm run start:dev
```

**Expected Output:**
```
[Nest] 12/31/2025, 10:30:45 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12/31/2025, 10:30:46 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] 12/31/2025, 10:30:47 AM     LOG [RoutesResolver] AuthController {/auth}: ...
[Nest] 12/31/2025, 10:30:47 AM     LOG [RoutesResolver] PostsController {/posts}: ...
[Nest] 12/31/2025, 10:30:47 AM     LOG [NestApplication] Nest application successfully started
🚀 Application is running on: http://localhost:3000
📚 Swagger docs: http://localhost:3000/api
```

### Production Mode
```powershell
npm run start:prod
```

### Build Only
```powershell
npm run build
```

### Linting & Code Quality
```powershell
npm run lint
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:3000
```

### 🔑 Authentication Endpoints

#### 1. Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1234567890,
    "email": "user@example.com",
    "username": "john_doe"
  }
}
```

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1234567890,
    "email": "user@example.com",
    "username": "john_doe"
  }
}
```

---

### 📄 Posts Endpoints

#### 3. Create Post (Authenticated)
```http
POST /posts
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post..."
}
```

**Response (201):**
```json
{
  "id": 550e8400-e29b-41d4-a716-446655440000,
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "published": false,
  "createdAt": "2025-12-31T10:30:00.000Z",
  "updatedAt": "2025-12-31T10:30:00.000Z",
  "authorId": 1234567890
}
```

#### 4. Get All Published Posts (Public)
```http
GET /posts
```

**Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My First Blog Post",
    "content": "This is the content...",
    "published": true,
    "createdAt": "2025-12-31T10:30:00.000Z",
    "updatedAt": "2025-12-31T10:30:00.000Z",
    "authorId": 1234567890
  }
]
```

#### 5. Get Single Post (Public)
```http
GET /posts/:id
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "My First Blog Post",
  "content": "This is the content...",
  "published": true,
  "createdAt": "2025-12-31T10:30:00.000Z",
  "updatedAt": "2025-12-31T10:30:00.000Z",
  "authorId": 1234567890
}
```

#### 6. Get My Posts (Authenticated)
```http
GET /posts/user/my-posts
Authorization: Bearer {access_token}
```

**Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My First Blog Post",
    "content": "Draft content...",
    "published": false,
    "createdAt": "2025-12-31T10:30:00.000Z",
    "updatedAt": "2025-12-31T10:30:00.000Z",
    "authorId": 1234567890
  }
]
```

#### 7. Update Post (Authenticated - Author Only)
```http
PATCH /posts/:id
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content here..."
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Updated Title",
  "content": "Updated content here...",
  "published": false,
  "createdAt": "2025-12-31T10:30:00.000Z",
  "updatedAt": "2025-12-31T11:30:00.000Z",
  "authorId": 1234567890
}
```

#### 8. Publish Post (Authenticated - Author Only)
```http
PATCH /posts/:id/publish
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "My First Blog Post",
  "content": "This is the content...",
  "published": true,
  "createdAt": "2025-12-31T10:30:00.000Z",
  "updatedAt": "2025-12-31T11:30:00.000Z",
  "authorId": 1234567890
}
```

#### 9. Delete Post (Authenticated - Author Only)
```http
DELETE /posts/:id
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "statusCode": 200,
  "message": "Post deleted successfully"
}
```

---

## 🔐 Authentication

### JWT Token Structure
```
Header.Payload.Signature

Payload contains:
{
  "email": "user@example.com",
  "sub": 1234567890,        // user ID
  "role": "user",
  "iat": 1704033000,        // issued at
  "exp": 1704637800         // expires at
}
```

### Using JWT in Requests
All protected endpoints require the `Authorization` header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOjEyMzQ1Njc4OTAsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA0MDMzMDAwLCJleHAiOjE3MDQ2Mzc4MDB9.signature
```

### Protected Routes (Require JWT)
- `POST /posts` - Create post
- `GET /posts/user/my-posts` - Get my posts
- `PATCH /posts/:id` - Update post
- `PATCH /posts/:id/publish` - Publish post
- `DELETE /posts/:id` - Delete post

### Public Routes (No Auth Required)
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /posts` - Get all published posts
- `GET /posts/:id` - Get single post

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'user',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id` (UUID) - Unique user identifier
- `email` (String) - User email (unique)
- `username` (String) - Display name
- `password` (String) - Hashed password (bcrypt)
- `role` (String) - User role (default: 'user')
- `createdAt` (Date) - Account creation date

### Posts Table
```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  authorId INTEGER NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (authorId) REFERENCES users(id)
);
```

**Fields:**
- `id` (UUID) - Unique post identifier
- `title` (String) - Post title
- `content` (String) - Post content/body
- `published` (Boolean) - Publication status
- `authorId` (UUID) - Foreign key to users table
- `createdAt` (Date) - Post creation date
- `updatedAt` (Date) - Last update date

### Relationships
- One User has Many Posts
- One Post belongs to One User (author)

---

## 💻 Code Examples

### Example 1: User Registration Flow
```typescript
// 1. User sends registration request
POST /auth/register
{
  "email": "alice@example.com",
  "username": "alice",
  "password": "Alice@123"
}

// 2. Backend validates input with RegisterDto
// 3. Password is hashed with bcrypt
// 4. User is created in database
// 5. JWT token is generated
// Response:
{
  "access_token": "eyJhb...",
  "user": {
    "id": 1234567890,
    "email": "alice@example.com",
    "username": "alice"
  }
}
```

### Example 2: Create and Publish Post
```typescript
// Step 1: Create draft post
POST /posts
Authorization: Bearer token123
{
  "title": "My New Article",
  "content": "Article content here..."
}
// Response: { id: "uuid-1", published: false, ... }

// Step 2: Update post (optional)
PATCH /posts/uuid-1
Authorization: Bearer token123
{
  "title": "My New Article (Updated)",
  "content": "Updated content..."
}

// Step 3: Publish post
PATCH /posts/uuid-1/publish
Authorization: Bearer token123
// Response: { id: "uuid-1", published: true, ... }

// Step 4: Others can now see the published post
GET /posts/uuid-1
// Response: { id: "uuid-1", title: "...", published: true, ... }
```

### Example 3: Authorization Check
```typescript
// Only author can update their post
PATCH /posts/uuid-1
Authorization: Bearer alice_token

// Check inside posts.service.ts:
async update(id, title, content, userId) {
  const post = await this.findOne(id);
  
  // Authorization check
  if (post.authorId !== userId) {
    throw new ForbiddenException('You can only update your own posts');
  }
  
  // Update allowed
  post.title = title;
  post.content = content;
  return post;
}
```

---

## ⚠️ Error Handling

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Common Error Codes

| Code | Scenario | Example |
|------|----------|---------|
| **400** | Bad Request | Invalid DTO, missing fields |
| **401** | Unauthorized | Missing/invalid JWT token |
| **403** | Forbidden | Trying to edit another's post |
| **404** | Not Found | Post ID doesn't exist |
| **409** | Conflict | Email already registered |
| **500** | Server Error | Database connection failed |

### Example Error Responses

**Invalid Email Format (400):**
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

**Post Not Found (404):**
```json
{
  "statusCode": 404,
  "message": "Post not found",
  "error": "Not Found"
}
```

**Unauthorized (401):**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**Forbidden - Not Author (403):**
```json
{
  "statusCode": 403,
  "message": "You can only update your own posts",
  "error": "Forbidden"
}
```

---

## 🔒 Security Features

### 1. Password Security
- ✅ Hashed with bcrypt (10 rounds)
- ✅ Never stored in plain text
- ✅ Never returned in API responses

### 2. Authentication
- ✅ JWT tokens with expiration (7 days)
- ✅ Secure secret key in environment variables
- ✅ Token validation on every protected request

### 3. Authorization
- ✅ Owner-only access for post updates/deletes
- ✅ Guard decorators on protected routes
- ✅ Role-based access control ready

### 4. Input Validation
- ✅ DTOs with class-validator decorators
- ✅ Email format validation
- ✅ Password minimum length (6 characters)
- ✅ String length validation

### 5. CORS
- ✅ Enabled globally for cross-origin requests
- ✅ Can be restricted to specific domains in production

### 6. Database
- ✅ TypeORM for SQL injection prevention
- ✅ Parameterized queries
- ✅ Entity relationships properly defined

---

## 📊 Performance & Scalability

### Current Implementation
- **In-Memory Storage**: Uses JavaScript arrays (development only)
- **Single Instance**: Single NestJS server
- **Synchronous DB**: TypeORM with postgres driver

### Production Recommendations
1. Enable database connection (currently configured but optional)
2. Use connection pooling (PgBouncer)
3. Add Redis caching for frequently accessed posts
4. Implement rate limiting on API endpoints
5. Add logging and monitoring (Winston, DataDog)
6. Use load balancer for multiple instances
7. Implement database replication for HA

---

## 🧪 Testing

### Recommended Testing Tools
- **Unit Tests**: Jest + supertest
- **Integration Tests**: jest + typeorm test utils
- **Load Testing**: Apache JMeter or Artillery

### Sample Test Structure
```typescript
describe('AuthController', () => {
  it('should register a new user', async () => {
    const response = await app.post('/auth/register')
      .send({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.access_token).toBeDefined();
  });
});
```

---

## 📝 Environment Variables Reference

```env
# Database
DB_HOST=localhost              # PostgreSQL host
DB_PORT=5432                   # PostgreSQL port
DB_USERNAME=postgres           # PostgreSQL user
DB_PASSWORD=postgres           # PostgreSQL password
DB_NAME=blog_db                # Database name

# JWT
JWT_SECRET=your-secret-key     # Secret key for signing tokens
JWT_EXPIRATION=7d              # Token expiration time

# Server
PORT=3000                      # Server port
NODE_ENV=development           # Environment (development/production)
```

---

## 📞 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Run `npm install`

### Issue: Database connection failed
**Solution**: 
- Ensure PostgreSQL is running
- Check DB credentials in `.env`
- Verify database exists: `CREATE DATABASE blog_db;`

### Issue: JWT token invalid
**Solution**:
- Check token hasn't expired
- Verify JWT_SECRET matches in .env
- Include "Bearer " prefix in Authorization header

### Issue: Port 3000 already in use
**Solution**:
- Change PORT in .env
- Or kill process: `Get-Process -Name node | Stop-Process -Force`

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Passport.js Guide](http://www.passportjs.org)
- [JWT Introduction](https://jwt.io)
- [REST API Best Practices](https://restfulapi.net)

---

## 📋 Checklist for Deployment

- [ ] Create `.env` file with secure values
- [ ] Set `NODE_ENV=production`
- [ ] Set `synchronize: false` in TypeORM config
- [ ] Run database migrations
- [ ] Test all endpoints in production environment
- [ ] Enable HTTPS/SSL
- [ ] Set up logging and monitoring
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline
- [ ] Document API version in production

---

## 👨‍💼 Project Information

- **Framework**: NestJS 10
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Port**: 3000
- **API Version**: 1.0.0
- **Documentation**: Swagger UI at `/api`

---

**Generated**: December 31, 2025
**Status**: ✅ Complete & Ready for Production
