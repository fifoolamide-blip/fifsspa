import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  confirmationCode: {
    type: String,
    unique: true,
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  duration: Number,
  price: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'confirmed',
  },
  notes: String,
  therapistPreference: String,
  reminderSent: {
    type: Boolean,
    default: false,
  },
  completionNotes: String,
  rating: Number,
  review: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  confirmedAt: Date,
  cancelledAt: Date,
})

// Index for faster queries
bookingSchema.index({ clientEmail: 1 })
bookingSchema.index({ date: 1 })
bookingSchema.index({ status: 1 })
bookingSchema.index({ serviceId: 1 })

export default mongoose.model('Booking', bookingSchema)
