const express = require('express');
const router = express.Router();
const {
  createDonation,
  verifyDonationPayment,
  getAllDonations,
  getDonation,
  getDonationStats,
} = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');
const { validateDonation } = require('../middleware/validation');

// Public routes
router.post('/', validateDonation, createDonation);
router.get('/verify/:sessionId', verifyDonationPayment);
router.get('/stats', getDonationStats);

// Protected routes (admin only)
router.get('/admin', protect, authorize('admin'), getAllDonations);
router.get('/admin/:id', protect, authorize('admin'), getDonation);

module.exports = router;