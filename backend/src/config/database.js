import mongoose from 'mongoose'
import MockDB from './mockDatabase.js'

let isUsingMockDB = false

export async function connectDB() {
  try {
    let mongoUri = process.env.MONGO_URI

    if (!mongoUri) {
      mongoUri = 'mongodb://localhost:27017/olaspa'
    }

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    })

    console.log('✅ MongoDB connected successfully')
    return conn
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed:', error.message)
    console.log('🔄 Switching to Mock Database for development...')
    
    isUsingMockDB = true
    await MockDB.connect()
    return MockDB
  }
}

export function getDB() {
  return isUsingMockDB ? MockDB : mongoose
}

export function isUsingMock() {
  return isUsingMockDB
}