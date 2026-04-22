import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import { errorHandler } from './middleware/auth.js'
import Admin from './models/Admin.js'

// Import routes
import servicesRouter from './routes/services.js'
import bookingsRouter from './routes/bookings.js'
import adminRouter from './routes/admin.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to database
await connectDB()

// Initialize default admin if it doesn't exist
async function initializeDefaultAdmin() {
  try {
    setTimeout(async () => {
      try {
        const adminExists = await Admin.findOne({
          email: process.env.ADMIN_EMAIL || 'admin@olaspa.com',
        })

        if (!adminExists) {
          const admin = new Admin({
            email: process.env.ADMIN_EMAIL || 'admin@olaspa.com',
            passwordHash: process.env.ADMIN_PASSWORD || 'admin123',
            name: 'Admin',
            role: 'admin',
            permissions: [
              'manage_bookings',
              'manage_services',
              'manage_availability',
              'view_reports',
            ],
            active: true,
          })
          await admin.save()
          console.log('✅ Default admin user created')
        }
      } catch (innerError) {
        console.log('ℹ️  Admin initialization (skipped for mock DB):', innerError.message)
      }
    }, 1000)
  } catch (error) {
    console.log('ℹ️  Admin initialization skipped')
  }
}

initializeDefaultAdmin()

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

// Routes
app.use('/api/services', servicesRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/admin', adminRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 API documentation: http://localhost:${PORT}/api`)
  console.log(`🔐 Admin panel: http://localhost:5173/admin/login`)
})

export default app