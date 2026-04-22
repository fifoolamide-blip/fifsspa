import mongoose from 'mongoose'

const availabilitySlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  dayOfWeek: String,
  timeSlots: [{
    time: String,
    available: {
      type: Boolean,
      default: true,
    },
    bookingId: mongoose.Schema.Types.ObjectId,
  }],
  closed: {
    type: Boolean,
    default: false,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

availabilitySlotSchema.index({ date: 1 })
availabilitySlotSchema.index({ date: 1, closed: 1 })

export default mongoose.model('AvailabilitySlot', availabilitySlotSchema)
