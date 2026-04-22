# Ola Spa - Premium Spa Website

A luxurious, fully-featured spa booking website with a clean, calming design and seamless user experience.

## 🎯 Project Overview

**Vision**: Create a premium spa website where users feel relaxed immediately upon landing, with a smooth booking system as the centerpiece.

**Tech Stack**:
- **Frontend**: React 18 + Tailwind CSS + Vite
- **Backend**: Node.js + Express + MongoDB
- **Additional**: Real-time availability, Admin Dashboard, Email confirmations

## 📁 Project Structure

```
ola-spa/
├── frontend/                 # React SPA application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   ├── styles/          # Global styles & design system
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Context providers
│   │   ├── assets/          # Images, fonts, media
│   │   └── App.jsx
│   ├── package.json
│   └── README.md
│
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/      # Auth, validation, etc
│   │   ├── config/          # Configuration
│   │   └── server.js
│   ├── package.json
│   └── README.md
│
├── docs/                    # Project documentation
│   ├── design-system.md
│   ├── api-documentation.md
│   ├── database-schema.md
│   └── setup-guide.md
│
└── README.md               # This file
```

## 🎨 Design System

### Colors
- **Primary**: `#9B8B6D` (Warm beige)
- **Secondary**: `#8FAF7A` (Sage green)
- **Accent**: `#D4AF37` (Gold)
- **Neutral**: `#F5F3F0` (Warm white)
- **Dark**: `#2C2416` (Rich dark)

### Typography
- **Headings**: Playfair Display (serif) - luxury, elegant
- **Body**: Inter (sans-serif) - clean, readable

### Components
- Rounded buttons (border-radius: 8px)
- Soft shadows (box-shadow: 0 2px 8px rgba(0,0,0,0.1))
- Smooth transitions (transition: all 0.3s ease)

## 📄 Core Pages

| Page | Purpose | Key Features |
|------|---------|--------------|
| **Homepage** | First impression | Hero, services preview, testimonials, CTA |
| **Services** | Browse offerings | Filters, descriptions, pricing, images |
| **Booking** | Reserve treatments | Service selection → Date → Time → Details → Confirm |
| **About** | Build trust | Story, team, certifications, mission |
| **Gallery** | Showcase ambiance | Grid layout, calming imagery |
| **Contact** | Communication | Form, phone, email, location, map |
| **Admin Dashboard** | Management | View/approve bookings, manage services, set availability |

## 🗂️ Database Models

### Booking
```
{
  _id: ObjectId,
  serviceId: ObjectId,
  clientName: String,
  clientEmail: String,
  clientPhone: String,
  date: Date,
  timeSlot: String,
  duration: Number,
  status: String (pending/confirmed/completed/cancelled),
  createdAt: Date
}
```

### Service
```
{
  _id: ObjectId,
  name: String,
  category: String (massage/skincare/packages),
  description: String,
  duration: Number (minutes),
  price: Number,
  image: String (URL),
  featured: Boolean,
  createdAt: Date
}
```

### AvailabilitySlot
```
{
  _id: ObjectId,
  date: Date,
  timeSlot: String,
  available: Boolean,
  serviceId: ObjectId,
  createdAt: Date
}
```

## 🚀 API Endpoints (Backend)

### Bookings
- `GET /api/bookings` - List all bookings (admin)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking status

### Services
- `GET /api/services` - List all services
- `GET /api/services?category=massage` - Filter by category
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Availability
- `GET /api/availability?serviceId=&date=2026-05-01` - Get available time slots
- `POST /api/availability` - Create availability slot (admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `POST /api/admin/login` - Admin authentication

## 📋 Development Phases

### Phase 1: Setup & Foundation (Start Here)
- [ ] Initialize frontend (React + Vite + Tailwind)
- [ ] Initialize backend (Node + Express)
- [ ] Set up MongoDB connection
- [ ] Create design system components

### Phase 2: Core Pages
- [ ] Homepage with hero and services preview
- [ ] Services page with filtering
- [ ] About, Gallery, Contact pages

### Phase 3: Booking System (CRITICAL)
- [ ] Booking workflow UI
- [ ] Availability logic
- [ ] Real-time slot selection
- [ ] Confirmation emails

### Phase 4: Backend Integration
- [ ] Connect frontend to API
- [ ] Implement all endpoints
- [ ] Database operations
- [ ] Error handling

### Phase 5: Admin Features
- [ ] Admin dashboard layout
- [ ] Service management
- [ ] Booking management
- [ ] Availability scheduling

### Phase 6: Polish & Deploy
- [ ] Responsiveness testing
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Deployment (Vercel/Railway for frontend, Heroku/Railway for backend)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Quick Setup

1. **Clone/Open this project**
   ```bash
   cd ola\ spa
   ```

2. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Set up Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

See [setup-guide.md](./docs/setup-guide.md) for detailed instructions.

## 📚 Documentation

- [Design System Details](./docs/design-system.md)
- [API Documentation](./docs/api-documentation.md)
- [Database Schema](./docs/database-schema.md)
- [Setup Guide](./docs/setup-guide.md)

## ✨ Key Features Checklist

### MVP (Minimum Viable Product)
- [x] Professional design
- [ ] Homepage with services preview
- [ ] Services page with filtering
- [ ] Booking system with date/time selection
- [ ] Basic backend API
- [ ] Simple admin dashboard
- [ ] Responsive design

### Post-MVP (Nice to Have)
- [ ] Online payments (Paystack/Flutterwave)
- [ ] Loyalty points system
- [ ] Gift cards
- [ ] Blog section
- [ ] WhatsApp integration
- [ ] Email confirmations
- [ ] Push notifications
- [ ] Dark mode

## 🎯 Next Steps

1. Open `docs/setup-guide.md` for detailed setup instructions
2. Start with Phase 1: Initialize frontend and backend
3. Build out the design system components first
4. Create homepage and services page
5. Implement booking system (most critical)

---

**Last Updated**: April 2026
**Project Status**: Initialization Phase
