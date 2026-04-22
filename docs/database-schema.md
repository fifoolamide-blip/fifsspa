# Database Schema - Ola Spa

## MongoDB Collections

### Collections Overview
```
- users
- bookings
- services
- availabilitySlots
- admins
- testimonials (optional)
- offers (optional)
```

---

## 📋 Collections Details

### 1. Services Collection

**Purpose**: Store all spa services offered

```json
{
  "_id": ObjectId,
  "name": "Swedish Massage",
  "category": "massage",
  "description": "Full body Swedish massage for deep relaxation",
  "detailedDescription": "Longer description for service detail page",
  "duration": 60,
  "price": 99,
  "image": "https://cdn.example.com/services/swedish-massage.jpg",
  "gallery": [
    "https://cdn.example.com/swedish-1.jpg",
    "https://cdn.example.com/swedish-2.jpg"
  ],
  "featured": true,
  "benefits": [
    "Reduces muscle tension",
    "Improves circulation",
    "Promotes relaxation"
  ],
  "packages": [
    {
      "duration": 30,
      "price": 59
    },
    {
      "duration": 60,
      "price": 99
    },
    {
      "duration": 90,
      "price": 149
    }
  ],
  "active": true,
  "createdAt": ISODate("2026-04-22"),
  "updatedAt": ISODate("2026-04-22")
}
```

**Indexes**:
```
- db.services.createIndex({ category: 1 })
- db.services.createIndex({ featured: 1 })
- db.services.createIndex({ active: 1 })
```

---

### 2. Bookings Collection

**Purpose**: Store all customer bookings

```json
{
  "_id": ObjectId,
  "confirmationCode": "OLA-2026-00001",
  "serviceId": ObjectId,
  "clientName": "Sarah Johnson",
  "clientEmail": "sarah@example.com",
  "clientPhone": "+234 801 234 5678",
  "date": ISODate("2026-05-15"),
  "timeSlot": "10:00 AM",
  "duration": 60,
  "price": 99,
  "status": "confirmed",
  "notes": "First time customer, prefer light pressure",
  "therapistPreference": "Optional - if available",
  "reminderSent": false,
  "completionNotes": "",
  "rating": null,
  "review": null,
  "createdAt": ISODate("2026-04-22"),
  "updatedAt": ISODate("2026-04-22"),
  "confirmedAt": ISODate("2026-04-22"),
  "cancelledAt": null
}
```

**Status values**: "pending" | "confirmed" | "completed" | "cancelled"

**Indexes**:
```
- db.bookings.createIndex({ clientEmail: 1 })
- db.bookings.createIndex({ date: 1 })
- db.bookings.createIndex({ status: 1 })
- db.bookings.createIndex({ serviceId: 1 })
- db.bookings.createIndex({ confirmationCode: 1 }, { unique: true })
- db.bookings.createIndex({ date: 1, timeSlot: 1 })
```

---

### 3. Availability Slots Collection

**Purpose**: Define available time slots for booking

```json
{
  "_id": ObjectId,
  "date": ISODate("2026-05-15"),
  "dayOfWeek": "Thursday",
  "timeSlots": [
    {
      "time": "09:00 AM",
      "available": true,
      "bookingId": null
    },
    {
      "time": "10:00 AM",
      "available": false,
      "bookingId": ObjectId("507f1f77bcf86cd799439011")
    },
    {
      "time": "11:00 AM",
      "available": true,
      "bookingId": null
    }
  ],
  "closed": false,
  "notes": "Special hours - Opening at 12 PM",
  "createdAt": ISODate("2026-04-22"),
  "updatedAt": ISODate("2026-04-22")
}
```

**Indexes**:
```
- db.availabilitySlots.createIndex({ date: 1 })
- db.availabilitySlots.createIndex({ date: 1, closed: 1 })
```

---

### 4. Admins Collection

**Purpose**: Store admin user accounts

```json
{
  "_id": ObjectId,
  "email": "admin@olaspa.com",
  "passwordHash": "$2b$10$...",
  "name": "Admin User",
  "role": "admin",
  "permissions": [
    "manage_bookings",
    "manage_services",
    "manage_availability",
    "view_reports"
  ],
  "active": true,
  "lastLogin": ISODate("2026-04-22"),
  "createdAt": ISODate("2026-04-22"),
  "updatedAt": ISODate("2026-04-22")
}
```

**Indexes**:
```
- db.admins.createIndex({ email: 1 }, { unique: true })
```

---

### 5. Testimonials Collection (Optional)

**Purpose**: Store customer reviews and testimonials

```json
{
  "_id": ObjectId,
  "bookingId": ObjectId,
  "clientName": "Sarah Johnson",
  "clientEmail": "sarah@example.com",
  "serviceName": "Swedish Massage",
  "rating": 5,
  "review": "Amazing experience! Very relaxing and professional.",
  "photo": "https://cdn.example.com/testimonial-photo.jpg",
  "featured": true,
  "verified": true,
  "createdAt": ISODate("2026-04-22")
}
```

**Indexes**:
```
- db.testimonials.createIndex({ featured: 1 })
- db.testimonials.createIndex({ rating: -1 })
```

---

### 6. Offers Collection (Optional)

**Purpose**: Store promotional offers and packages

```json
{
  "_id": ObjectId,
  "title": "Summer Relaxation Package",
  "description": "Get 3 massages and save 20%",
  "discount": 20,
  "discountType": "percentage",
  "serviceIds": [
    ObjectId,
    ObjectId
  ],
  "validFrom": ISODate("2026-05-01"),
  "validUntil": ISODate("2026-08-31"),
  "code": "SUMMER20",
  "usageLimit": 100,
  "usageCount": 23,
  "active": true,
  "createdAt": ISODate("2026-04-22")
}
```

---

## 🔗 Relationships

```
Services
  ↓
Bookings (references serviceId)
  ↓
AvailabilitySlots (tracks which booking occupies slot)

Testimonials (references bookingId)
```

---

## 📊 Sample Queries

### Get all bookings for a specific date
```javascript
db.bookings.find({
  date: { $gte: new Date("2026-05-15"), $lt: new Date("2026-05-16") },
  status: "confirmed"
})
```

### Get available time slots for a date
```javascript
db.availabilitySlots.find({
  date: new Date("2026-05-15"),
  closed: false
})
```

### Count bookings by service
```javascript
db.bookings.aggregate([
  {
    $group: {
      _id: "$serviceId",
      count: { $sum: 1 }
    }
  }
])
```

### Get total revenue
```javascript
db.bookings.aggregate([
  {
    $match: {
      status: "completed"
    }
  },
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$price" }
    }
  }
])
```

---

## 🛡️ Data Validation Rules

### Services
- `name`: Required, max 100 chars
- `category`: Enum: "massage" | "skincare" | "packages"
- `price`: Required, min 0
- `duration`: Required, min 15, max 180 (minutes)
- `image`: Valid URL

### Bookings
- `clientEmail`: Valid email format
- `clientPhone`: Valid phone format
- `date`: Must be today or future date
- `timeSlot`: Must match available slot
- Cannot have duplicate serviceId + date + timeSlot for confirmed bookings

### AvailabilitySlots
- `date`: Must be today or future date
- `timeSlots`: Array with valid times (HH:MM AM/PM format)

---

## 📈 Performance Considerations

1. **Pagination**: Always use pagination for large result sets (limit default 20)
2. **Caching**: Cache services list (30-minute TTL)
3. **Archiving**: Move old bookings to archive collection after 1 year
4. **Indexes**: Create indexes on frequently queried fields
5. **Batch Operations**: Use bulk operations for admin reports

---

**Last Updated**: April 2026
