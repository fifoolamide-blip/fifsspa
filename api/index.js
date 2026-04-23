import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Determine the frontend URL for CORS
const getFrontendUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return process.env.FRONTEND_URL || 'http://localhost:5173'
}

// Middleware
app.use(cors({
  origin: [
    getFrontendUrl(),
    'http://localhost:5173',
    'http://localhost:3000',
    /\.vercel\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'production',
    frontend: getFrontendUrl()
  })
})

// API Routes
app.get('/api/services', async (req, res) => {
  try {
    // Mock services response
    const services = [
      { id: 1, name: 'Massage', price: 80, duration: 60 },
      { id: 2, name: 'Facial', price: 70, duration: 45 },
      { id: 3, name: 'Sauna', price: 50, duration: 30 }
    ]
    res.json({ success: true, data: services })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get('/api/services/:id', async (req, res) => {
  try {
    const services = {
      1: { id: 1, name: 'Massage', price: 80, duration: 60, description: 'Relaxing massage' },
      2: { id: 2, name: 'Facial', price: 70, duration: 45, description: 'Rejuvenating facial' },
      3: { id: 3, name: 'Sauna', price: 50, duration: 30, description: 'Hot sauna session' }
    }
    const service = services[req.params.id]
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' })
    }
    res.json({ success: true, data: service })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/api/bookings', async (req, res) => {
  try {
    const { service, date, time, name, email, phone } = req.body
    // Mock booking response
    res.json({ 
      success: true, 
      data: { 
        id: Math.random().toString(36).substr(2, 9),
        service,
        date,
        time,
        name,
        email,
        phone,
        status: 'confirmed'
      } 
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get('/api/bookings', async (req, res) => {
  try {
    res.json({ success: true, data: [] })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      res.json({ 
        success: true, 
        data: { 
          token: 'mock-jwt-token',
          user: { email, role: 'admin' }
        } 
      })
    } else {
      res.status(401).json({ success: false, error: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ success: false, error: 'Internal server error' })
})

// Export for Vercel
export default app
