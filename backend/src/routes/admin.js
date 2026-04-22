import express from 'express'
import { adminLogin, getDashboardStats } from '../controllers/adminController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/login', adminLogin)
router.get('/dashboard', authMiddleware, getDashboardStats)

export default router
