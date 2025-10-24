import express from 'express';
import userRoutes from './v1/user/user.route';
import trainRoutes from './v1/train/train.route';
import stationRoutes from './v1/station/station.route';
import authRoutes from './v1/auth/auth.route';

const router = express.Router();
router.use('/user', userRoutes);
router.use('/train', trainRoutes);
router.use('/station', stationRoutes);
router.use('/auth', authRoutes);
module.exports = router;
