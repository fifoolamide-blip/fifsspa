# 🚀 Quick Start Guide - Ola Spa

Get your premium spa website up and running in minutes!

## ⚡ Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas) or use local MongoDB
- **Git** (optional)

## 🎯 Quick Setup (5 minutes)

### Step 1: Get MongoDB Connection String

**Option A: MongoDB Atlas (Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Create a new project and cluster (free tier available)
4. Click "Connect" and copy the connection string
5. Replace `<password>` with your password
6. Replace `olaspa` with your database name

**Option B: Local MongoDB**
```
mongodb://localhost:27017/olaspa
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Update .env file with MongoDB connection
# Edit .env and replace MONGODB_URI with your connection string

# Start backend server
npm run dev
```

Backend will be running at: **http://localhost:5000**

### Step 3: Setup Frontend (in a new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

Frontend will be running at: **http://localhost:5173**

✅ **You're done! Open http://localhost:5173 in your browser**

---

## 🛠️ Key URLs

| Section | URL | Default Credentials |
|---------|-----|-------------------|
| **User Site** | http://localhost:5173 | N/A |
| **Booking** | http://localhost:5173/booking | N/A |
| **Admin Login** | http://localhost:5173/admin/login | admin@olaspa.com / admin123 |
| **API** | http://localhost:5000/api | N/A |
| **Health Check** | http://localhost:5000/api/health | N/A |

---

## 📋 What's Included

### Frontend
✅ Beautiful responsive design
✅ Home, Services, Services, Booking, About, Gallery, Contact pages
✅ Multi-step booking wizard
✅ Service filtering and search
✅ Admin dashboard
✅ Mobile-friendly UI

### Backend
✅ REST API with all endpoints
✅ MongoDB database integration
✅ Admin authentication
✅ Booking management
✅ Email confirmations
✅ Real-time availability

---

## 🔑 Default Admin Credentials

```
Email: admin@olaspa.com
Password: admin123
```

⚠️ **CHANGE THESE IN PRODUCTION!**

Update in `backend/.env`:
```
ADMIN_EMAIL=your-email@gmail.com
ADMIN_PASSWORD=your-strong-password
```

---

## 📊 Test the API

### Get Services
```bash
curl http://localhost:5000/api/services
```

### Create a Booking
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "serviceId": "SERVICE_ID_HERE",
    "clientName": "John Doe",
    "clientEmail": "john@example.com",
    "clientPhone": "+234 800 123 4567",
    "date": "2026-05-15",
    "timeSlot": "10:00 AM"
  }'
```

### Check Availability
```bash
curl "http://localhost:5000/api/bookings/availability?serviceId=SERVICE_ID&date=2026-05-15"
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@olaspa.com",
    "password": "admin123"
  }'
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows: Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Failed
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
- Ensure credentials are correct

### npm install fails
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Frontend won't load
- Check that Vite dev server is running on port 5173
- Clear browser cache (Ctrl+Shift+Delete)
- Try different port: `npm run dev -- --port 3000`

---

## 📱 Features by Page

### 🏠 Home
- Hero section with CTA
- Featured services
- Why choose us section
- Testimonials
- Newsletter signup

### 💆 Services
- Browse all services
- Filter by category and price
- Service details modal
- Book now button

### 📅 Booking
- 5-step wizard
- Service selection
- Date and time picker
- Client information
- Confirmation with code

### 👨‍💼 Admin Dashboard
- Login authentication
- Dashboard with statistics
- Bookings management
- Service management
- Revenue tracking

---

## 🔐 Security Notes

### Before Production:
1. Change admin credentials
2. Set strong JWT_SECRET in `.env`
3. Enable HTTPS
4. Set CORS origin to your domain
5. Use environment variables for all secrets
6. Enable rate limiting
7. Add input validation
8. Use production MongoDB connection

---

## 📚 Documentation

- [Full Setup Guide](docs/setup-guide.md)
- [API Documentation](docs/api-documentation.md)
- [Database Schema](docs/database-schema.md)
- [Design System](docs/design-system.md)
- [Development Roadmap](DEVELOPMENT.md)

---

## 🚀 Next Steps

1. **Customize Content**
   - Update service names and descriptions
   - Add your spa photos
   - Update contact information
   - Customize colors in `tailwind.config.js`

2. **Add Sample Data**
   - Log in to admin panel
   - Add your services
   - Set availability
   - Create test bookings

3. **Configure Email**
   - Set up SMTP credentials in `.env`
   - Test booking confirmations
   - Customize email templates

4. **Deploy**
   - Frontend → Vercel/Netlify
   - Backend → Railway/Heroku
   - Database → MongoDB Atlas

---

## 🎯 Performance Tips

- Clear browser cache if styles don't load
- Both servers must be running (frontend + backend)
- Use MongoDB Atlas for reliability
- Enable image optimization
- Set up CDN for images

---

**Need help?** Check the documentation files or review the source code comments!

Happy building! 🎉
