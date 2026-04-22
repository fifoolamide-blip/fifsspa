import Admin from '../models/Admin.js'
import Booking from '../models/Booking.js'
import jwt from 'jsonwebtoken'

export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      })
    }

    const admin = await Admin.findOne({ email, active: true })

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      })
    }

    const isPasswordValid = await admin.comparePassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.json({
      success: true,
      data: {
        token,
        admin: {
          _id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getDashboardStats(req, res, next) {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const endOfToday = new Date(today)
    endOfToday.setDate(endOfToday.getDate() + 1)

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

    const [
      totalBookings,
      bookingsThisMonth,
      bookingsToday,
      pendingBookings,
      upcomingBookings,
      completedBookings,
    ] = await Promise.all([
      Booking.countDocuments({}),
      Booking.countDocuments({
        date: { $gte: startOfMonth, $lt: endOfMonth },
      }),
      Booking.countDocuments({
        date: { $gte: today, $lt: endOfToday },
      }),
      Booking.countDocuments({
        status: 'pending',
      }),
      Booking.countDocuments({
        date: { $gte: today },
        status: { $in: ['confirmed', 'pending'] },
      }),
      Booking.countDocuments({
        status: 'completed',
      }),
    ])

    // Calculate revenue
    const completedBookingsData = await Booking.find({
      status: 'completed',
    }).select('price')

    const totalRevenue = completedBookingsData.reduce((sum, b) => sum + (b.price || 0), 0)

    const thisMonthBookingsData = await Booking.find({
      date: { $gte: startOfMonth, $lt: endOfMonth },
      status: 'completed',
    }).select('price')

    const revenueThisMonth = thisMonthBookingsData.reduce((sum, b) => sum + (b.price || 0), 0)

    res.json({
      success: true,
      data: {
        totalBookings,
        bookingsThisMonth,
        bookingsToday,
        pendingBookings,
        upcomingBookings,
        completedBookings,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        revenueThisMonth: Math.round(revenueThisMonth * 100) / 100,
      },
    })
  } catch (error) {
    next(error)
  }
}
