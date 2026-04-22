import express from 'express'
import {
  createBooking,
  getAvailability,
  getBookingByConfirmationCode,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.post('/', createBooking)
router.get('/availability', getAvailability)
router.get('/:confirmationCode', getBookingByConfirmationCode)

// Admin routes
router.get('/', authMiddleware, getAllBookings)
router.put('/:id', authMiddleware, updateBookingStatus)
router.delete('/:id', authMiddleware, cancelBooking)

export default router
