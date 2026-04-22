import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  name: String,
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'manager'],
  },
  permissions: [String],
  active: {
    type: Boolean,
    default: true,
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next()
  
  try {
    const salt = await bcryptjs.genSalt(10)
    this.passwordHash = await bcryptjs.hash(this.passwordHash, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare passwords
adminSchema.methods.comparePassword = async function(password) {
  return await bcryptjs.compare(password, this.passwordHash)
}

export default mongoose.model('Admin', adminSchema)
