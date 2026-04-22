import Booking from '../models/Booking.js'
import Service from '../models/Service.js'
import AvailabilitySlot from '../models/AvailabilitySlot.js'
import { sendBookingConfirmation, generateConfirmationCode } from '../utils/email.js'

export async function createBooking(req, res, next) {
  try {
    const { serviceId, clientName, clientEmail, clientPhone, date, timeSlot, notes } = req.body

    // Validate required fields
    if (!serviceId || !clientName || !clientEmail || !clientPhone || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      })
    }

    // Get service details
    const service = await Service.findById(serviceId)
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' })
    }

    // Check availability
    const bookingDate = new Date(date)
    bookingDate.setHours(0, 0, 0, 0)
    const endDate = new Date(bookingDate)
    endDate.setDate(endDate.getDate() + 1)

    const existingBooking = await Booking.findOne({
      serviceId,
      date: { $gte: bookingDate, $lt: endDate },
      timeSlot,
      status: { $in: ['confirmed', 'pending'] },
    })

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        error: 'This time slot is already booked',
      })
    }

    // Create booking
    const confirmationCode = generateConfirmationCode()
    const booking = new Booking({
      confirmationCode,
      serviceId,
      clientName,
      clientEmail,
      clientPhone,
      date: bookingDate,
      timeSlot,
      duration: service.duration,
      price: service.price,
      status: 'confirmed',
      notes,
      confirmedAt: new Date(),
    })

    await booking.save()

    // Send confirmation email
    await sendBookingConfirmation(booking, service)

    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      data: booking,
    })
  } catch (error) {
    next(error)
  }
}

export async function getAvailability(req, res, next) {
  try {
    const { serviceId, date } = req.query

    if (!serviceId || !date) {
      return res.status(400).json({
        success: false,
        error: 'serviceId and date are required',
      })
    }

    const bookingDate = new Date(date)
    bookingDate.setHours(0, 0, 0, 0)
    const endDate = new Date(bookingDate)
    endDate.setDate(endDate.getDate() + 1)

    // Get existing bookings for this date
    const existingBookings = await Booking.find({
      serviceId,
      date: { $gte: bookingDate, $lt: endDate },
      status: { $in: ['confirmed', 'pending'] },
    })

    // Generate available slots (9 AM to 5 PM, 1-hour slots)
    const allSlots = []
    for (let hour = 9; hour < 17; hour++) {
      const ampm = hour < 12 ? 'AM' : 'PM'
      const displayHour = hour > 12 ? hour - 12 : hour
      const slot = `${displayHour}:00 ${ampm}`
      allSlots.push(slot)
    }

    // Filter out booked slots
    const bookedSlots = existingBookings.map(b => b.timeSlot)
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot))

    res.json({
      success: true,
      data: {
        date: date,
        availableSlots,
      },
    })
  } catch (error) {
    next(error)
  }
}

export async function getBookingByConfirmationCode(req, res, next) {
  try {
    const { confirmationCode } = req.params
    const { email } = req.query

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required for verification',
      })
    }

    const booking = await Booking.findOne({
      confirmationCode,
      clientEmail: email,
    }).populate('serviceId')

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found',
      })
    }

    res.json({ success: true, data: booking })
  } catch (error) {
    next(error)
  }
}

export async function getAllBookings(req, res, next) {
  try {
    const { status, startDate, endDate } = req.query
    const query = {}

    if (status) {
      query.status = status
    }

    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) {
        const end = new Date(endDate)
        end.setDate(end.getDate() + 1)
        query.date.$lt = end
      }
    }

    const bookings = await Booking.find(query)
      .populate('serviceId')
      .sort({ date: -1 })
      .limit(100)

    res.json({ success: true, data: bookings })
  } catch (error) {
    next(error)
  }
}

export async function updateBookingStatus(req, res, next) {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status',
      })
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    )

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' })
    }

    res.json({ success: true, data: booking })
  } catch (error) {
    next(error)
  }
}

export async function cancelBooking(req, res, next) {
  try {
    const { id } = req.params

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status: 'cancelled',
        cancelledAt: new Date(),
        updatedAt: new Date(),
      },
      { new: true }
    )

    if (!booking) {
      return res.status(404).json({ success: false, error: 'Booking not found' })
    }

    res.json({ success: true, message: 'Booking cancelled successfully', data: booking })
  } catch (error) {
    next(error)
  }
}
