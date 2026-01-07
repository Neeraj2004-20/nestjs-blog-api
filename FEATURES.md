# 🚀 Blog API v2.0 - Complete Features Guide

## 📋 Table of Contents
1. [Authentication & Security](#authentication--security)
2. [Posts Management](#posts-management)
3. [Comments System](#comments-system)
4. [Pagination & Search](#pagination--search)
5. [Email Verification](#email-verification)
6. [Rate Limiting](#rate-limiting)
7. [Testing](#testing)

---

## 🔐 Authentication & Security

### JWT Tokens
- **Access Token**: 15 minutes expiration
- **Refresh Token**: 7 days expiration
- Secure secret key management via environment variables

### Password Security
- Bcrypt hashing (10 rounds)
- Minimum 6 characters with uppercase, lowercase, and numbers
- Login attempt tracking with account lock

### Login Attempt Protection
```
Max Attempts: 5
Lock Duration: 15 minutes
```

---

## 📝 Posts Management

### Create Post
```http
POST /posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Blog Post",
  "content": "Post content here",
  "category": "technology"
}
```

### Get Posts (with Pagination)
```http
GET /posts?page=1&limit=10&search=query&sortBy=createdAt&order=DESC
```

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Post Title",
      "content": "Content",
      "published": true,
      "likes": 0,
      "author": { "id": "uuid", "username": "john" },
      "createdAt": "2026-01-07T...",
      "updatedAt": "2026-01-07T..."
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Publish Post
```http
PATCH /posts/{postId}/publish
Authorization: Bearer {token}
```

### Search Posts
```http
GET /posts/search?query=nestjs&page=1&limit=10
```

---

## 💬 Comments System

### Create Comment
```http
POST /posts/{postId}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Great post!"
}
```

### Get Comments on Post
```http
GET /posts/{postId}/comments
```

### Update Comment
```http
PATCH /posts/{postId}/comments/{commentId}
Authorization: Bearer {token}

{
  "content": "Updated comment"
}
```

### Delete Comment
```http
DELETE /posts/{postId}/comments/{commentId}
Authorization: Bearer {token}
```

### Like Comment
```http
POST /posts/{postId}/comments/{commentId}/like
Authorization: Bearer {token}
```

---

## 📄 Pagination & Search

### Pagination Parameters
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `sortBy` (default: createdAt) - Sort field
- `order` (default: DESC) - ASC or DESC

### Search
- Full-text search on post title and content
- Case-insensitive matching
- Works across published posts only

---

## ✉️ Email Verification

### Register with Email
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "SecurePass123"
}
```

Verification email sent automatically.

### Verify Email
```http
GET /auth/verify-email?token={token}
```

### Resend Verification
```http
POST /auth/resend-verification
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Password Reset
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

Reset link sent via email. Click link or use token:

```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token",
  "newPassword": "NewSecurePass123"
}
```

---

## 🚦 Rate Limiting

### Default Limits
- **100 requests per minute** per IP address
- Returns 429 Too Many Requests when exceeded
- Includes `X-RateLimit-*` headers in responses

### Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
```

---

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:cov
```

### Test Files
- `src/auth/auth.service.spec.ts` - Authentication tests
- `src/posts/posts.controller.spec.ts` - Posts endpoint tests

### Example Test
```typescript
describe('AuthService', () => {
  it('should register a new user', async () => {
    const result = await authService.register(
      'test@example.com',
      'testuser',
      'SecurePass123'
    );
    expect(result).toHaveProperty('access_token');
  });
});
```

---

## 📊 Database Schema

### Users Table
```
id (UUID) - Primary key
email (String, Unique)
username (String)
password (String, Hashed)
role (String, default: 'user')
emailVerified (Boolean, default: false)
loginAttempts (Number, default: 0)
lockUntil (Date, nullable)
createdAt (Timestamp)
updatedAt (Timestamp)
```

### Posts Table
```
id (UUID) - Primary key
title (String)
content (Text)
published (Boolean, default: false)
likes (Number, default: 0)
authorId (UUID) - Foreign key to users
createdAt (Timestamp)
updatedAt (Timestamp)
```

### Comments Table
```
id (UUID) - Primary key
content (Text)
likes (Number, default: 0)
authorId (UUID) - Foreign key to users
postId (UUID) - Foreign key to posts
createdAt (Timestamp)
updatedAt (Timestamp)
```

---

## 🔧 Configuration

### Environment Variables
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=blog_db

# JWT
JWT_SECRET=your-secret-key
REFRESH_TOKEN_SECRET=your-refresh-secret
JWT_EXPIRATION=15m

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000
```

---

## 📦 API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/register` | ❌ | Register new user |
| POST | `/auth/login` | ❌ | Login |
| POST | `/auth/forgot-password` | ❌ | Request password reset |
| POST | `/auth/reset-password` | ❌ | Reset password with token |
| GET | `/auth/verify-email` | ❌ | Verify email with token |
| POST | `/posts` | ✅ | Create post |
| GET | `/posts` | ❌ | Get published posts (paginated) |
| GET | `/posts/:id` | ❌ | Get single post |
| PATCH | `/posts/:id` | ✅ | Update post (author only) |
| PATCH | `/posts/:id/publish` | ✅ | Publish post (author only) |
| DELETE | `/posts/:id` | ✅ | Delete post (author only) |
| GET | `/posts/user/my-posts` | ✅ | Get user's posts |
| POST | `/posts/:postId/comments` | ✅ | Create comment |
| GET | `/posts/:postId/comments` | ❌ | Get post comments |
| PATCH | `/posts/:postId/comments/:id` | ✅ | Update comment (author only) |
| DELETE | `/posts/:postId/comments/:id` | ✅ | Delete comment (author only) |
| POST | `/posts/:postId/comments/:id/like` | ✅ | Like comment |
| GET | `/users/profile` | ✅ | Get user profile |

---

## 🎉 Version 2.0 Features

✅ Enhanced DTOs with validation  
✅ Comments system with likes  
✅ Pagination & filtering  
✅ Search functionality  
✅ Rate limiting middleware  
✅ Refresh token support  
✅ Email verification  
✅ Password reset flow  
✅ Login attempt tracking  
✅ Jest testing setup  
✅ Comprehensive error handling  
✅ Swagger documentation  

**Status**: Production Ready 🚀
