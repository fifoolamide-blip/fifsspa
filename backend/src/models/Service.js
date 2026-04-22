import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['massage', 'skincare', 'packages'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDescription: String,
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 180,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: String,
  gallery: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  benefits: [String],
  packages: [{
    duration: Number,
    price: Number,
  }],
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Service', serviceSchema)
