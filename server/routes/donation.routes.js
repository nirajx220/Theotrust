const express = require('express');
const router = express.Router();
const {
  createDonation,
  verifyDonationPayment,
  getAllDonations,
  getDonation,
  getDonationStats,
} = require('../controllers/donationController');
const { protect } = require('../middleware/auth');
const { validateDonation } = require('../middleware/validation');

// Public routes
router.post('/', validateDonation, createDonation);
router.get('/verify/:sessionId', verifyDonationPayment);
router.get('/stats', getDonationStats);

// Protected routes (admin only) - moved to /admin prefix
router.get('/admin', protect, getAllDonations);
router.get('/admin/:id', protect, getDonation);

module.exports = router;