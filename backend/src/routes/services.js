import express from 'express'
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getAllServices)
router.get('/:id', getServiceById)

// Admin routes
router.post('/', authMiddleware, createService)
router.put('/:id', authMiddleware, updateService)
router.delete('/:id', authMiddleware, deleteService)

export default router
