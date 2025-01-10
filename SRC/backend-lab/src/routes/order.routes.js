import express from 'express';
import * as orderController from '../controllers/order.controller.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// User routes
router.post('/', verifyToken, requireRole(['user']), orderController.createOrder);
router.get('/', verifyToken, requireRole(['user']), orderController.getUserOrders);

// Admin routes
router.get('/all', verifyToken, requireRole(['admin']), orderController.getAllOrders);
router.put('/status', verifyToken, requireRole(['admin']), orderController.updateOrderStatus);

export default router;