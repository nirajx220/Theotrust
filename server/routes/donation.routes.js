import express from 'express';
const router = express.Router();
import {
  createDonation,
  verifyDonationPayment,
  getAllDonations,
  getDonation,
  getDonationStats,
} from '../controllers/donationController';
import { protect } from '../middleware/auth';
import { validateDonation } from '../middleware/validation';

// Public routes
router.post('/', validateDonation, createDonation);
router.get('/verify/:sessionId', verifyDonationPayment);
router.get('/stats', getDonationStats);

// Protected routes (admin only)
router.get('/', protect, getAllDonations);
router.get('/:id', protect, getDonation);

export default router;