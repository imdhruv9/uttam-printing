# Printing Pro - Project Summary

## 🎉 Project Overview

**Printing Pro** is a production-quality, full-stack printing press storefront application with a modern, responsive design and comprehensive admin functionality.

### Key Features Delivered

✅ **Public Storefront**
- Product browsing with pagination and filters
- Search functionality
- Category filtering
- Product detail pages with image carousels
- Price calculator (per sq. ft)
- Contact form with product references
- Fully responsive mobile design

✅ **Admin Panel**
- Secure JWT authentication
- Complete product CRUD operations
- Image upload with preview
- Analytics dashboard
- Product count by category
- Protected routes

✅ **Technical Excellence**
- Production-ready code architecture
- Comprehensive validation
- Error handling
- Security best practices
- Accessibility (WCAG AA)
- Unit and integration tests
- CI/CD pipeline
- Docker support

## 📂 Project Structure

```
printing/
├── backend/                      # Spring Boot Application
│   ├── src/main/java/
│   │   └── com/printingpro/
│   │       ├── config/          # Security, OpenAPI, Web config
│   │       ├── controller/      # REST controllers
│   │       ├── dto/             # Request/Response DTOs with validation
│   │       ├── entity/          # JPA entities
│   │       ├── exception/       # Exception handling
│   │       ├── mapper/          # @Component mappers
│   │       ├── repository/      # Spring Data repositories
│   │       ├── security/        # JWT utilities
│   │       └── service/         # Business logic
│   ├── src/main/resources/
│   │   └── db/migration/        # Flyway migrations
│   └── src/test/                # Unit & integration tests
├── frontend/                     # React Application
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API client
│   │   ├── types/               # TypeScript types
│   │   └── utils/               # Helpers & validation
│   └── __tests__/               # Component tests
├── docker-compose.yml           # PostgreSQL container
├── Postman_Collection.json      # API testing
├── setup.ps1                    # Windows setup script
├── run-backend.ps1              # Backend runner
├── run-frontend.ps1             # Frontend runner
└── README.md                    # Comprehensive docs
```

## 🎨 Color Palette (Brand Colors)

- **Primary**: `#C66E52` - Warm terracotta
- **Secondary**: `#E9B63B` - Golden yellow
- **Accent**: `#ECD5BC` - Light beige
- **Neutral**: `#758A93` - Cool gray

All colors are accessible and meet WCAG AA contrast requirements.

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.2
- **Language**: Java 17 (LTS)
- **Database**: PostgreSQL 15
- **Security**: Spring Security + JWT
- **ORM**: Spring Data JPA + Hibernate
- **Migration**: Flyway
- **Mapping**: MapStruct (with `@Component`)
- **Validation**: Jakarta Validation
- **Documentation**: OpenAPI 3 / Swagger
- **Testing**: JUnit 5, Mockito

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS 3
- **Routing**: React Router 6
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier, Checkstyle

## 📋 API Endpoints

### Public Endpoints
- `GET /api/products` - List products (with pagination and filters)
- `GET /api/products/{id}` - Get product details
- `POST /api/contact` - Submit contact form
- `POST /api/auth/login` - Admin login

### Protected Endpoints (Require ROLE_ADMIN)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product
- `GET /api/admin/products/analytics/*` - Get analytics
- `POST /api/media/upload` - Upload images

Full API documentation available at `/swagger-ui.html` when running.

## 🚀 Quick Start (Windows)

### Option 1: Automated Setup (Recommended)
```powershell
# Run the setup script
.\setup.ps1

# In terminal 1: Start backend
.\run-backend.ps1

# In terminal 2: Start frontend
.\run-frontend.ps1
```

### Option 2: Manual Setup
```powershell
# Start PostgreSQL
docker-compose up -d

# Backend
cd backend
.\mvnw.cmd clean package
.\mvnw.cmd spring-boot:run

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8084
- **Swagger UI**: http://localhost:8084/swagger-ui.html

## 🧪 Testing

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

### Code Quality
```powershell
# Backend
cd backend
.\mvnw.cmd checkstyle:check

# Frontend
cd frontend
npm run lint
npm run format
```

## 📦 Database Schema

### Products
- UUID primary key
- Name, description, category
- Price per sq. ft (decimal)
- Negotiable flag (boolean)
- Multiple images with ordering
- Timestamps (created, updated)

### Product Categories
- FLEX_PRINTING
- POSTER
- STANDEE
- INDOOR_ADVERTISEMENT
- OUTDOOR_ADVERTISEMENT
- VISITING_CARD
- PAMPHLET_HANDWILL

### Contact Messages
- Name, email, phone, message
- Optional product reference
- Timestamp

### Users
- Email-based authentication
- BCrypt password hashing
- Role-based access (ROLE_USER, ROLE_ADMIN)

## 🔒 Security Features

✅ JWT-based authentication
✅ Role-based authorization (RBAC)
✅ Password encryption (BCrypt)
✅ Request validation (Jakarta Validation)
✅ CORS configuration
✅ SQL injection protection (JPA)
✅ XSS protection (React escaping)
✅ File upload validation
✅ Centralized error handling

## ♿ Accessibility

✅ Semantic HTML
✅ ARIA labels and roles
✅ Keyboard navigation
✅ Alt text for images
✅ Form labels and validation messages
✅ Color contrast (WCAG AA)
✅ Focus indicators
✅ Screen reader friendly

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for all screen sizes
- Touch-friendly UI elements
- Optimized images
- Collapsible navigation

## 🎯 Validation Rules

### Product Creation
- Name: Required, max 150 chars
- Description: Required, max 2000 chars
- Category: Required, valid enum
- Price: Required, positive number
- Images: At least one required

### Contact Form
- Name: Required, max 100 chars
- Email: Required, valid format
- Phone: Optional, valid format (10-20 digits)
- Message: Required, max 2000 chars

### Login
- Email: Required, valid format
- Password: Required, min 6 chars

## 🌟 Code Quality Standards

### Backend
- **Mappers**: Implemented as `@Component` (not static)
- **DTOs**: Comprehensive validation annotations
- **Layered Architecture**: Controllers → Services → Repositories
- **Error Handling**: Centralized `@ControllerAdvice`
- **Logging**: Structured with SLF4J
- **Comments**: JavaDoc for public APIs

### Frontend
- **TypeScript**: Strict mode enabled
- **Components**: Functional with hooks
- **Forms**: React Hook Form + Zod
- **State**: React Query for server state
- **Styling**: TailwindCSS utility classes
- **Comments**: JSDoc for complex logic

## 📊 Sample Data

The application comes with 15 pre-seeded sample products across all categories:
- Flex Printing (3 products)
- Posters (2 products)
- Standees (2 products)
- Indoor Ads (2 products)
- Outdoor Ads (2 products)
- Visiting Cards (2 products)
- Pamphlets (2 products)

## 🚀 Deployment Options

### Docker Deployment
```powershell
# Build images
docker-compose -f docker-compose.prod.yml build

# Run containers
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

**Backend**:
```powershell
.\mvnw.cmd clean package -DskipTests
java -jar target/printingpro-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

**Frontend**:
```powershell
npm run build
# Serve the dist/ folder with any static server
```

## 📝 Environment Variables

### Backend (.env)
- `DB_HOST`, `DB_PORT`, `DB_NAME` - Database config
- `JWT_SECRET` - JWT signing key (256+ bits)
- `JWT_EXPIRATION` - Token expiry (milliseconds)
- `FILE_UPLOAD_DIR` - Upload directory
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` - Initial admin

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API URL

## 🔄 CI/CD Pipeline

GitHub Actions workflow includes:
- ✅ Backend build and test
- ✅ Frontend build and test
- ✅ Code quality checks (Checkstyle, ESLint, Prettier)
- ✅ Artifact uploads
- ✅ Automated on push/PR

## 📚 Additional Resources

- **README.md** - Comprehensive setup and usage guide
- **CONTRIBUTING.md** - Contribution guidelines
- **Postman_Collection.json** - API testing collection
- **Swagger UI** - Interactive API documentation

## ✨ Production Checklist

Before deploying to production:

- [ ] Change admin credentials
- [ ] Update JWT secret (strong, random, 256+ bits)
- [ ] Configure production database
- [ ] Set up S3 or cloud storage for images
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS for production domain
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy
- [ ] Review and update security headers
- [ ] Set appropriate cache headers
- [ ] Configure CDN for static assets

## 🤝 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Review CONTRIBUTING.md
- Check README.md for FAQs

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ following industry best practices**

Thank you for using Printing Pro!

