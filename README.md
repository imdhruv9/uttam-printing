# Uttam Printing

A production-quality, full-stack printing press storefront application with admin panel.

## 🎨 Features

- **Public Storefront**: Browse products with prices per sq. ft., negotiable badges, and detailed views
- **Price Calculator**: Calculate estimates based on dimensions
- **Contact Form**: Send inquiries directly to the business
- **Admin Panel**: Full CRUD operations for products with image uploads
- **Secure Authentication**: JWT-based auth with role-based access control
- **Responsive Design**: Mobile-first, accessible (WCAG AA)

## 🎨 Color Palette

- Primary: `#C66E52`
- Secondary: `#E9B63B`
- Accent: `#ECD5BC`
- Neutral: `#758A93`

## 🛠️ Tech Stack

### Frontend
- React 18+ with TypeScript
- TailwindCSS for styling
- React Router for navigation
- React Query for data fetching
- React Hook Form + Zod for validation
- Vite for build tooling

### Backend
- Spring Boot 3.2+
- Java 17 (LTS)
- PostgreSQL 15+
- Spring Security with JWT
- Spring Data JPA
- Flyway for migrations
- MapStruct for DTO mapping
- OpenAPI/Swagger documentation

### DevOps
- Docker & Docker Compose
- PostgreSQL container
- Local file storage (S3-compatible for production)

## 📋 Prerequisites

- **Java 17+** ([Download](https://adoptium.net/))
- **Node.js 18+** and npm ([Download](https://nodejs.org/))
- **Docker Desktop** for Windows ([Download](https://www.docker.com/products/docker-desktop))
- **PostgreSQL** (via Docker or local install)
- **Git**

## 🚀 Quick Start (Windows)

### 1. Clone the Repository

```powershell
git clone <repository-url>
cd printing
```

### 2. Start PostgreSQL with Docker

```powershell
docker-compose up -d
```

This starts PostgreSQL on port 5432.

### 3. Configure Environment Variables

Create `backend/.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=printingpro
DB_USERNAME=postgres
DB_PASSWORD=postgres123
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-256-bits
JWT_EXPIRATION=86400000
FILE_UPLOAD_DIR=./uploads
```

Create `frontend/.env` file:

```env
VITE_API_BASE_URL=http://localhost:8084/api
```

### 4. Run the Backend

```powershell
cd backend
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run
```

Backend will run on `http://localhost:8084`

Swagger UI: `http://localhost:8084/swagger-ui.html`

### 5. Run the Frontend

Open a new terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
printing/
├── backend/                    # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/printingpro/
│   │   │   │       ├── config/           # Security, OpenAPI configs
│   │   │   │       ├── controller/       # REST controllers
│   │   │   │       ├── dto/              # Request/Response DTOs
│   │   │   │       ├── entity/           # JPA entities
│   │   │   │       ├── exception/        # Custom exceptions & handlers
│   │   │   │       ├── mapper/           # DTO-Entity mappers (@Component)
│   │   │   │       ├── repository/       # Spring Data repositories
│   │   │   │       ├── security/         # JWT utilities
│   │   │   │       └── service/          # Business logic
│   │   │   └── resources/
│   │   │       ├── db/migration/         # Flyway migrations
│   │   │       └── application.yml       # Spring Boot config
│   │   └── test/                         # Unit & integration tests
│   ├── pom.xml
│   └── mvnw.cmd                          # Maven wrapper for Windows
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/                   # Reusable components
│   │   ├── pages/                        # Page components
│   │   ├── services/                     # API client
│   │   ├── hooks/                        # Custom React hooks
│   │   ├── types/                        # TypeScript types
│   │   ├── utils/                        # Utility functions
│   │   └── App.tsx                       # Main app component
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── docker-compose.yml          # PostgreSQL container
├── .gitignore
└── README.md
```

## 🗄️ Database Schema

### Product
- `id` - UUID primary key
- `name` - Product name (max 150 chars)
- `description` - Full description (max 2000 chars)
- `category` - Enum (FLEX_PRINTING, POSTER, STANDEE, etc.)
- `price_per_sqft` - Decimal price
- `negotiable` - Boolean (default true)
- `created_at`, `updated_at` - Timestamps

### ProductImage
- `id` - UUID primary key
- `product_id` - Foreign key to product
- `url` - Image URL
- `alt_text` - Alt text for accessibility
- `ordering` - Display order

### ContactMessage
- `id` - UUID primary key
- `name`, `email`, `phone` - Contact info
- `message` - Message content
- `product_id` - Optional reference to product
- `created_at` - Timestamp

### User
- `id` - UUID primary key
- `username` - Unique email
- `password_hash` - BCrypt hashed password
- `roles` - Comma-separated roles (ROLE_USER, ROLE_ADMIN)
- `created_at` - Timestamp

## 🔌 API Endpoints

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "your-admin-email",
  "password": "your-password"
}

Response 200:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "Bearer",
  "username": "your-admin-email",
  "roles": ["ROLE_ADMIN"]
}
```

### Public Product Endpoints

#### Get All Products (Paginated)
```http
GET /api/products?page=0&size=12&category=POSTER&search=banner&minPrice=10&maxPrice=100

Response 200:
{
  "content": [
    {
      "id": "uuid",
      "name": "Premium Vinyl Banner",
      "description": "High-quality outdoor banner...",
      "category": "FLEX_PRINTING",
      "pricePerSqft": 25.50,
      "negotiable": true,
      "images": [
        {
          "id": "uuid",
          "url": "/uploads/banner-001.jpg",
          "altText": "Vinyl banner sample",
          "ordering": 0
        }
      ],
      "createdAt": "2024-01-15T10:30:00",
      "updatedAt": "2024-01-15T10:30:00"
    }
  ],
  "totalElements": 25,
  "totalPages": 3,
  "number": 0,
  "size": 12
}
```

#### Get Product by ID
```http
GET /api/products/{id}

Response 200:
{
  "id": "uuid",
  "name": "Premium Vinyl Banner",
  "description": "...",
  "category": "FLEX_PRINTING",
  "pricePerSqft": 25.50,
  "negotiable": true,
  "images": [...],
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### Contact Endpoint

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "I'm interested in bulk orders...",
  "productId": "uuid-optional"
}

Response 201:
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'm interested in bulk orders...",
  "createdAt": "2024-01-15T14:22:00"
}
```

### Admin Product Endpoints (Requires ROLE_ADMIN)

#### Create Product
```http
POST /api/admin/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Premium Vinyl Banner",
  "description": "High-quality outdoor vinyl banner...",
  "category": "FLEX_PRINTING",
  "pricePerSqft": 25.50,
  "negotiable": true,
  "images": [
    {
      "url": "/uploads/banner-001.jpg",
      "altText": "Vinyl banner sample",
      "ordering": 0
    }
  ]
}

Response 201:
{
  "id": "uuid",
  "name": "Premium Vinyl Banner",
  ...
}
```

#### Update Product
```http
PUT /api/admin/products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Product Name",
  "description": "Updated description...",
  "category": "POSTER",
  "pricePerSqft": 30.00,
  "negotiable": false
}

Response 200: (Updated product)
```

#### Delete Product
```http
DELETE /api/admin/products/{id}
Authorization: Bearer {token}

Response 204: No Content
```

### Media Upload Endpoint

#### Upload Image
```http
POST /api/media/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary file data]

Response 200:
{
  "url": "/uploads/abc123def456.jpg",
  "filename": "abc123def456.jpg"
}
```

## 🧪 Running Tests

### Backend Tests
```powershell
cd backend
.\mvnw.cmd test
```

### Frontend Tests
```powershell
cd frontend
npm test
```

## 🏗️ Building for Production

### Backend
```powershell
cd backend
.\mvnw.cmd clean package -DskipTests
```

JAR file will be in `target/printingpro-0.0.1-SNAPSHOT.jar`

Run with:
```powershell
java -jar target/printingpro-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### Frontend
```powershell
cd frontend
npm run build
```

Build output will be in `dist/` folder. Serve with any static file server or CDN.

## 🌐 Production Deployment

### Environment Variables (Production)

#### Backend (`application-prod.yml` or environment variables)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

jwt:
  secret: ${JWT_SECRET}
  expiration: ${JWT_EXPIRATION}

file:
  upload-dir: ${FILE_UPLOAD_DIR}
  
# For S3 (optional)
aws:
  s3:
    bucket: ${AWS_S3_BUCKET}
    region: ${AWS_REGION}
    access-key: ${AWS_ACCESS_KEY}
    secret-key: ${AWS_SECRET_KEY}
```

#### Frontend
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

### S3 Configuration (Optional)

For production, configure S3-compatible storage:

1. Set environment variables:
   - `AWS_S3_BUCKET`
   - `AWS_REGION`
   - `AWS_ACCESS_KEY`
   - `AWS_SECRET_KEY`

2. Update `application-prod.yml` to use S3 storage service

3. Images will be uploaded to S3 and URLs returned will be CDN-backed

## 📊 Database Migrations

Flyway automatically runs migrations on startup. Migration files are in:
```
backend/src/main/resources/db/migration/
```

- `V1__Create_tables.sql` - Initial schema
- `V2__Seed_data.sql` - Admin user and sample products

To run migrations manually:
```powershell
cd backend
.\mvnw.cmd flyway:migrate
```

## 🔒 Security Considerations

1. **Change default admin credentials** immediately
2. **Set strong JWT secret** (min 256 bits) in production
3. **Use HTTPS** in production
4. **Enable CORS** only for trusted domains
5. **Validate file uploads** (type, size limits)
6. **Rate limiting** on authentication endpoints
7. **SQL injection protection** via JPA parameterized queries
8. **XSS protection** via React's built-in escaping

## 🐛 Troubleshooting

### Port Already in Use
```powershell
# Check what's using port 8084
netstat -ano | findstr :8084
# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Docker Issues
```powershell
# Stop all containers
docker-compose down
# Remove volumes and restart
docker-compose down -v
docker-compose up -d
```

### Database Connection Failed
- Ensure PostgreSQL container is running: `docker ps`
- Check environment variables in `.env`
- Verify database credentials

### File Upload Issues
- Ensure `FILE_UPLOAD_DIR` exists and is writable
- Check file size limits in `application.yml`

## 📝 Code Quality

### Linting
```powershell
# Backend (Checkstyle)
cd backend
.\mvnw.cmd checkstyle:check

# Frontend (ESLint)
cd frontend
npm run lint
```

### Formatting
```powershell
# Frontend (Prettier)
cd frontend
npm run format
```

## 📄 License

MIT License - feel free to use this project for commercial purposes.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@printingpro.com

---

Built with ❤️ by senior developers following industry best practices.

