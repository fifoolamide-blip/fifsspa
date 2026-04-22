# Frontend - Ola Spa React Application

A premium spa website frontend built with React, Vite, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ServiceCard.jsx
│   ├── BookingForm.jsx
│   └── ...
├── pages/              # Page components (route-based)
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Booking.jsx
│   ├── About.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── services/           # API integration
│   ├── api.js         # Axios configuration
│   ├── servicesAPI.js
│   ├── bookingsAPI.js
│   └── ...
├── hooks/             # Custom React hooks
│   ├── useServices.js
│   ├── useBooking.js
│   └── ...
├── context/           # React Context
│   ├── BookingContext.jsx
│   └── UserContext.jsx
├── styles/            # Global styles
│   └── globals.css
├── assets/
│   ├── images/
│   └── fonts/
├── App.jsx
└── main.jsx
```

## 🎨 Design System

- **Colors**: Soft beige, sage green, gold accents
- **Typography**: Playfair Display (headings), Inter (body)
- **Spacing**: 8px base unit
- **Components**: Pre-built design tokens in Tailwind config

See `/docs/design-system.md` for complete details.

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting (add when needed)
npm run lint         # Run ESLint
```

## 🔗 Environment Variables

Create `.env.local`:

```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Dependencies

- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **zustand** - State management (lightweight)
- **date-fns** - Date utilities
- **react-icons** - Icon library
- **tailwindcss** - Styling

## 🎯 Pages to Build

- [ ] Homepage
- [ ] Services Page
- [ ] Booking Page
- [ ] About Page
- [ ] Gallery Page
- [ ] Contact Page
- [ ] Admin Dashboard (separate route)

---

**For setup details, see**: `docs/setup-guide.md`
