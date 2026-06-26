const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be at least 1'],
  },
  currency: {
    type: String,
    default: 'USD',
    uppercase: true,
    enum: ['USD', 'GBP', 'EUR', 'CAD', 'AUD'],
  },
  donorName: {
    type: String,
    required: [true, 'Donor name is required'],
    trim: true,
  },
  donorEmail: {
    type: String,
    required: [true, 'Donor email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  message: {
    type: String,
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  wonderfulDonationId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    default: 'wonderful',
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for faster queries
donationSchema.index({ status: 1, createdAt: -1 });
donationSchema.index({ sessionId: 1 });
donationSchema.index({ donorEmail: 1 });

module.exports = mongoose.model('Donation', donationSchema);