# Backend - Ola Spa Node.js API

A powerful REST API for the Ola Spa booking system built with Node.js, Express, and MongoDB.

## Quick Start

```bash
npm install
npm run dev
```

Server runs on: http://localhost:5000

## 📁 Project Structure

```
src/
├── models/                # MongoDB schemas
│   ├── Service.js
│   ├── Booking.js
│   ├── AvailabilitySlot.js
│   ├── Admin.js
│   └── ...
├── routes/               # API routes
│   ├── services.js
│   ├── bookings.js
│   ├── availability.js
│   ├── admin.js
│   └── ...
├── controllers/          # Business logic
│   ├── serviceController.js
│   ├── bookingController.js
│   ├── adminController.js
│   └── ...
├── middleware/           # Express middleware
│   ├── auth.js          # JWT authentication
│   ├── validation.js    # Request validation
│   └── errorHandler.js
├── config/
│   ├── database.js      # MongoDB connection
│   └── email.js         # Email configuration
├── utils/
│   ├── validators.js
│   ├── emailService.js
│   └── helpers.js
└── server.js            # Main entry point
```

## 🔗 API Endpoints

### Public Endpoints
- `GET /api/services` - List all services
- `GET /api/services/:id` - Get service details
- `POST /api/bookings` - Create booking
- `GET /api/bookings/availability` - Check availability
- `GET /api/bookings/:confirmationCode` - Get booking confirmation

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/bookings` - View all bookings
- `PUT /api/admin/bookings/:id` - Update booking status
- `POST /api/admin/services` - Create service
- `PUT /api/admin/services/:id` - Update service
- `DELETE /api/admin/services/:id` - Delete service
- `GET /api/admin/dashboard` - Dashboard statistics

For full API documentation, see: `docs/api-documentation.md`

## 🗄️ Database Models

Detailed schemas for:
- Services
- Bookings
- Availability Slots
- Admin Users
- Testimonials (optional)
- Offers (optional)

See: `docs/database-schema.md`

## 🔐 Authentication

Uses JWT (JSON Web Tokens) for admin authentication.

**How it works**:
1. Admin posts credentials to `/api/admin/login`
2. Server returns JWT token
3. Token included in `Authorization` header for protected routes
4. Middleware verifies token before allowing access

## 📧 Email Configuration

Configured to send:
- Booking confirmation emails
- Booking reminder emails (24 hours before)
- Admin notifications

Set up SMTP in `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 📚 Available Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start

# Add these when ready
npm test              # Run tests
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
```

## 🌍 Environment Variables

Create `.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/olaspa
JWT_SECRET=your-secret-key-change-in-production
ADMIN_EMAIL=admin@olaspa.com
ADMIN_PASSWORD=change-on-first-login
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@olaspa.com
```

## 📦 Core Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **nodemailer** - Email sending
- **axios** - HTTP requests

## 🚀 Deployment

### Using Railway
```bash
# Push to Git repository
git push

# Railway auto-deploys
```

### Using Heroku
```bash
heroku login
heroku create ola-spa-api
git push heroku main
```

## 🧪 Testing

```bash
# Test health check
curl http://localhost:5000/api/health

# Test services
curl http://localhost:5000/api/services

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"serviceId":"...","clientName":"John","clientEmail":"john@example.com","date":"2026-05-15","timeSlot":"10:00 AM"}'
```

## 📋 Development Checklist

- [ ] Set up MongoDB
- [ ] Create all models
- [ ] Implement all routes
- [ ] Add validation middleware
- [ ] Set up authentication
- [ ] Configure email service
- [ ] Add error handling
- [ ] Add logging
- [ ] Write API documentation
- [ ] Set up tests
- [ ] Optimize queries
- [ ] Deploy

---

**Setup Guide**: `docs/setup-guide.md`
**API Documentation**: `docs/api-documentation.md`
**Database Schema**: `docs/database-schema.md`
