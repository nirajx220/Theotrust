const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Program = require('../models/Program');

// Get donation statistics
router.get('/', async (req, res) => {
  try {
    // Total donations count
    const totalDonations = await Donation.countDocuments({ status: 'completed' });

    // Total amount
    const totalAmountResult = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalAmount = totalAmountResult[0]?.total || 0;

    // Active donors (unique emails)
    const activeDonors = await Donation.distinct('donorEmail', { status: 'completed' });

    // Active programs
    const activePrograms = await Program.countDocuments({ isActive: true });

    // Recent donations
    const recentDonations = await Donation.find({ status: 'completed' })
      .sort({ completedAt: -1 })
      .limit(5)
      .select('amount donorName completedAt currency');

    // Monthly stats (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(1); // Set to 1st day to avoid rollover issues
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Donation.aggregate([
      {
        $match: {
          status: 'completed',
          completedAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$completedAt' },
            month: { $month: '$completedAt' },
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const stats = {
      totalDonations,
      totalAmount,
      activeDonors: activeDonors.length,
      activePrograms,
      recentDonations,
      monthlyStats,
    };

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;