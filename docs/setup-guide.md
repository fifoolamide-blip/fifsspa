# Setup Guide - Ola Spa Development Environment

## Prerequisites

Before starting, ensure you have installed:

1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **MongoDB** (Atlas recommended for development)
   - Create free account: https://www.mongodb.com/cloud/atlas
   - Or use local MongoDB: https://docs.mongodb.com/manual/installation/

3. **Git** (optional but recommended)
   - Download: https://git-scm.com/

4. **Code Editor** (VS Code recommended)
   - Download: https://code.visualstudio.com/

---

## 🎯 Phase 1: Frontend Setup

### Step 1: Initialize React Project with Vite

```bash
cd frontend

npm create vite@latest . -- --template react

# Follow the prompts, select "React"
```

### Step 2: Install Dependencies

```bash
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p

# Install additional libraries
npm install react-router-dom axios zustand date-fns react-icons
npm install -D @tailwindcss/forms @tailwindcss/typography
```

### Step 3: Configure Tailwind

Update `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F6',
          100: '#F5F3F0',
          600: '#9B8B6D',
          700: '#8B7B5D',
        },
        secondary: {
          50: '#F7FAF5',
          600: '#8FAF7A',
          700: '#7A9563',
        },
        accent: '#D4AF37',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Step 4: Update `index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;600&display=swap');

/* Global styles */
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #F5F3F0;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}
```

### Step 5: Create Project Structure

```bash
mkdir -p src/{components,pages,services,styles,hooks,context,assets/{images,fonts}}

# Create basic directories
```

### Step 6: Create `.env.local`

```
VITE_API_URL=http://localhost:5000/api
```

### Step 7: Test Frontend

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🎯 Phase 2: Backend Setup

### Step 1: Initialize Node Project

```bash
cd backend

npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express mongoose dotenv cors axios nodemailer bcryptjs jsonwebtoken
npm install -D nodemon
```

### Step 3: Create Project Structure

```bash
mkdir -p src/{models,routes,controllers,middleware,config,utils}
```

### Step 4: Create `package.json` Scripts

Update `package.json`:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### Step 5: Create `.env` File

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/olaspa?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-in-production
ADMIN_EMAIL=admin@olaspa.com
ADMIN_PASSWORD=initial-password-change-first-login
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@olaspa.com
```

### Step 6: Create Main Server File (`src/server.js`)

```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (to be added)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Step 7: Test Backend

```bash
npm run dev
```

Visit: `http://localhost:5000/api/health`

You should see: `{"status":"Server is running"}`

---

## 🗄️ Phase 3: MongoDB Connection

### Step 1: Get MongoDB Connection String

1. Go to MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a project and cluster
4. Get connection string (looks like: `mongodb+srv://...`)

### Step 2: Update Backend `src/config/database.js`

```javascript
import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
```

### Step 3: Update `src/server.js`

```javascript
import { connectDB } from './config/database.js';

connectDB();
```

---

## 📁 File Structure After Setup

```
ola-spa/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── .env.local
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── config/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── docs/
├── README.md
└── .gitignore
```

---

## 🚀 Running Both Servers

### Terminal 1: Frontend
```bash
cd frontend
npm run dev
```

### Terminal 2: Backend
```bash
cd backend
npm run dev
```

Your application should now be running:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## ✅ Verification Checklist

- [ ] Node.js installed (v18+)
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] MongoDB connection string obtained
- [ ] `.env` file created in backend
- [ ] `.env.local` file created in frontend
- [ ] Both servers running without errors
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:5000/api/health

---

## 📚 Next Steps

1. **Create Database Models**: See `docs/database-schema.md`
2. **Build Design Components**: Review `docs/design-system.md`
3. **Implement API Endpoints**: Follow `docs/api-documentation.md`
4. **Build Frontend Pages**: Start with homepage
5. **Implement Booking System**: Most critical feature

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

### MongoDB Connection Error
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist (allow all for development)
- Ensure credentials are correct

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### Port 5173 not accessible
- Ensure frontend is running
- Check firewall settings
- Try different port: `npm run dev -- --port 3000`

---

**Last Updated**: April 2026
