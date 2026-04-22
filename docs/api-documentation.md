# API Documentation - Ola Spa Backend

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.olaspa.com/api
```

---

## 🔓 Public Endpoints

### Services Endpoints

#### Get All Services
```
GET /services
```

**Query Parameters**:
- `category` (optional): "massage" | "skincare" | "packages"
- `minPrice` (optional): Number
- `maxPrice` (optional): Number
- `sort` (optional): "price_asc" | "price_desc" | "popular"

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Swedish Massage",
      "category": "massage",
      "description": "Full body relaxation massage",
      "duration": 60,
      "price": 99,
      "image": "https://...",
      "featured": true
    }
  ]
}
```

---

#### Get Single Service
```
GET /services/:id
```

**Response**:
```json
{
  "success": true,
  "data": { /* service object */ }
}
```

---

### Booking Endpoints

#### Create Booking
```
POST /bookings
```

**Request Body**:
```json
{
  "serviceId": "507f1f77bcf86cd799439011",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "clientPhone": "+234 801 234 5678",
  "date": "2026-05-15",
  "timeSlot": "10:00 AM",
  "notes": "Optional special requests"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Booking confirmed! Check your email for details.",
  "data": {
    "_id": "507f191e810c19729de860ea",
    "serviceId": "507f1f77bcf86cd799439011",
    "clientName": "John Doe",
    "date": "2026-05-15",
    "timeSlot": "10:00 AM",
    "status": "confirmed",
    "confirmationCode": "OLA-2026-00123"
  }
}
```

**Status Codes**:
- `201`: Booking created successfully
- `400`: Invalid request data
- `409`: Time slot not available

---

#### Get Availability
```
GET /bookings/availability?serviceId=<id>&date=<YYYY-MM-DD>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "date": "2026-05-15",
    "availableSlots": [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM"
    ]
  }
}
```

---

#### Get Booking Confirmation
```
GET /bookings/:confirmationCode
```

**Query Parameters**:
- `email`: Client email for verification

**Response**:
```json
{
  "success": true,
  "data": { /* full booking details */ }
}
```

---

## 🔐 Admin Endpoints (Requires Authentication)

### Admin Authentication

#### Admin Login
```
POST /admin/login
```

**Request Body**:
```json
{
  "email": "admin@olaspa.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "admin@olaspa.com",
    "role": "admin"
  }
}
```

**Headers for subsequent requests**:
```
Authorization: Bearer <token>
```

---

### Services Management (Admin)

#### Create Service
```
POST /admin/services
Headers: Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "name": "Hot Stone Massage",
  "category": "massage",
  "description": "Relaxing massage with heated stones",
  "duration": 90,
  "price": 149,
  "image": "https://...",
  "featured": false
}
```

**Response**: `201` with created service object

---

#### Update Service
```
PUT /admin/services/:id
Headers: Authorization: Bearer <token>
```

**Request Body**: Same as create, but only include fields to update

**Response**: `200` with updated service object

---

#### Delete Service
```
DELETE /admin/services/:id
Headers: Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

---

### Bookings Management (Admin)

#### Get All Bookings
```
GET /admin/bookings
Headers: Authorization: Bearer <token>
```

**Query Parameters**:
- `status` (optional): "pending" | "confirmed" | "completed" | "cancelled"
- `startDate` (optional): YYYY-MM-DD
- `endDate` (optional): YYYY-MM-DD
- `sort` (optional): "date_asc" | "date_desc"

**Response**:
```json
{
  "success": true,
  "data": [ /* array of bookings */ ],
  "pagination": {
    "total": 145,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

---

#### Update Booking Status
```
PUT /admin/bookings/:id
Headers: Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "status": "confirmed"
}
```

**Allowed statuses**: pending | confirmed | completed | cancelled

**Response**: `200` with updated booking

---

#### Cancel Booking
```
DELETE /admin/bookings/:id
Headers: Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

### Availability Management (Admin)

#### Set Availability Slots
```
POST /admin/availability
Headers: Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "date": "2026-05-15",
  "timeSlots": [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM"
  ]
}
```

**Response**: `201` with created slots

---

#### Get Dashboard Stats
```
GET /admin/dashboard
Headers: Authorization: Bearer <token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalBookings": 542,
    "bookingsThisMonth": 89,
    "bookingsToday": 5,
    "totalRevenue": 45250,
    "revenueThisMonth": 7850,
    "pendingBookings": 3,
    "upcomingBookings": 12
  }
}
```

---

## 📊 Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here",
  "details": "Additional context if available"
}
```

### Common Error Codes
- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Missing or invalid token
- `403`: Forbidden - Not enough permissions
- `404`: Not Found - Resource doesn't exist
- `409`: Conflict - Resource already exists or slot unavailable
- `500`: Internal Server Error

---

## 🔄 Rate Limiting

- Public endpoints: 100 requests per minute per IP
- Admin endpoints: 200 requests per minute per token

---

## 📧 Email Notifications

### Booking Confirmation Email
Sent automatically when booking is created:
- Confirmation code
- Service details
- Booking date/time
- Location and contact info
- Cancellation instructions

### Booking Reminder Email
Sent 24 hours before appointment

### Admin Notification Email
Sent to admin when new booking is received

---

## 🧪 Testing the API

### Using cURL

```bash
# Get services
curl http://localhost:5000/api/services

# Create booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "507f1f77bcf86cd799439011",
    "clientName": "John Doe",
    "clientEmail": "john@example.com",
    "clientPhone": "+234 801 234 5678",
    "date": "2026-05-15",
    "timeSlot": "10:00 AM"
  }'
```

### Using Postman
Import the collection: [Link to Postman collection - to be created]

---

**Last Updated**: April 2026
