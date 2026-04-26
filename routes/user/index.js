import express from 'express';
import userRoutes from './v1/user/user.route';
import productRoutes from './v1/product/product.route';
import authRoutes from './v1/auth/auth.route';

const router = express.Router();
router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/auth', authRoutes);
module.exports = router;
