const Donation = require('../models/Donation');
const { 
  createDonationSession, 
  verifyDonation,
  getDonationDetails 
} = require('../config/wonderful');

// Create donation session
exports.createDonation = async (req, res) => {
  try {
    const { amount, currency = 'USD', donorEmail, donorName, message } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid donation amount' 
      });
    }

    // Create Wonderful.org donation session
    const session = await createDonationSession(amount, currency, {
      donor_email: donorEmail,
      donor_name: donorName,
      message: message || '',
    });

    // Create donation record in database (pending status)
    const donation = await Donation.create({
      amount,
      currency,
      donorEmail,
      donorName,
      message,
      sessionId: session.id,
      status: 'pending',
      paymentMethod: 'wonderful',
    });

    res.status(201).json({
      success: true,
      sessionId: session.id,
      sessionUrl: session.url,
      donation: {
        id: donation._id,
        amount: donation.amount,
        currency: donation.currency,
      },
    });
  } catch (error) {
    console.error('Donation creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create donation session' 
    });
  }
};

// Verify donation after payment
exports.verifyDonationPayment = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Session ID is required' 
      });
    }

    // Verify with Wonderful.org
    const sessionData = await verifyDonation(sessionId);

    if (sessionData.status !== 'completed') {
      return res.status(400).json({ 
        success: false, 
        message: 'Donation not completed' 
      });
    }

    // Update donation in database
    const donation = await Donation.findOneAndUpdate(
      { sessionId },
      {
        status: 'completed',
        wonderfulDonationId: sessionData.donation_id,
        completedAt: new Date(),
      },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Donation not found' 
      });
    }

    res.json({
      success: true,
      donation: {
        id: donation._id,
        amount: donation.amount,
        currency: donation.currency,
        status: donation.status,
        donorName: donation.donorName,
      },
    });
  } catch (error) {
    console.error('Donation verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to verify donation' 
    });
  }
};

// Get all donations (admin)
exports.getAllDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = status ? { status } : {};

    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const count = await Donation.countDocuments(query);

    res.json({
      success: true,
      donations,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch donations' 
    });
  }
};

// Get single donation
exports.getDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ 
        success: false, 
        message: 'Donation not found' 
      });
    }

    res.json({
      success: true,
      donation,
    });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch donation' 
    });
  }
};

// Get donation statistics
exports.getDonationStats = async (req, res) => {
  try {
    const totalDonations = await Donation.countDocuments({ status: 'completed' });
    
    const totalAmount = await Donation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const recentDonations = await Donation.find({ status: 'completed' })
      .sort({ completedAt: -1 })
      .limit(5)
      .select('amount donorName completedAt');

    res.json({
      success: true,
      stats: {
        totalDonations,
        totalAmount: totalAmount[0]?.total || 0,
        recentDonations,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch statistics' 
    });
  }
};