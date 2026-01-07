# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-22

### Added
- Initial release of Blog API
- User authentication with JWT
- User profile management
- Blog posts CRUD operations
- Post publishing workflow
- Swagger API documentation
- Protected routes with authentication guards
- Password hashing with bcrypt
- In-memory data storage
- TypeORM integration (database ready)

### Features
- User registration and login
- Create, read, update, delete posts
- Publish/unpublish posts
- User authorization (users can only manage their own posts)
- Role-based access control setup
- Comprehensive API documentation

### Tech Stack
- NestJS 10.0
- TypeScript 5.0
- TypeORM 0.3
- JWT authentication
- Swagger/OpenAPI
- PostgreSQL (optional)

### Development
- Watch mode for development
- ESLint configuration
- TypeScript strict mode ready
- Proper error handling
- Validation pipes

## [Unreleased]

### Planned Features
- Email verification
- Password reset functionality
- User roles and permissions
- Post categories and tags
- Comments on posts
- Pagination for posts
- Search functionality
- Rate limiting
- Caching with Redis
- File upload for post images
- User profiles with avatars
- Social features (likes, shares)
