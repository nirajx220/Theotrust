const axios = require('axios');

const wonderfulConfig = {
  apiKey: process.env.WONDERFUL_API_KEY,
  secretKey: process.env.WONDERFUL_SECRET_KEY,
  charityId: process.env.WONDERFUL_CHARITY_ID,
  baseUrl: 'https://api.wonderful.org/v1',
};

// Create Wonderful API client
const wonderfulClient = axios.create({
  baseURL: wonderfulConfig.baseUrl,
  headers: {
    'Authorization': `Bearer ${wonderfulConfig.apiKey}`,
    'Content-Type': 'application/json',
  },
});

// Create donation session
const createDonationSession = async (amount, currency = 'USD', metadata = {}) => {
  try {
    const response = await wonderfulClient.post('/donations/sessions', {
      charity_id: wonderfulConfig.charityId,
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      metadata,
      success_url: `${process.env.CLIENT_URL}/donation/success?session_id={SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/donate`,
    });

    return response.data;
  } catch (error) {
    console.error('Wonderful API Error:', error.response?.data || error.message);
    throw new Error('Failed to create donation session');
  }
};

// Verify donation
const verifyDonation = async (sessionId) => {
  try {
    const response = await wonderfulClient.get(`/donations/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Wonderful verification error:', error.response?.data || error.message);
    throw new Error('Failed to verify donation');
  }
};

// Get donation details
const getDonationDetails = async (donationId) => {
  try {
    const response = await wonderfulClient.get(`/donations/${donationId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch donation details:', error.message);
    throw error;
  }
};

// Verify webhook signature
const verifyWebhookSignature = (payload, signature) => {
  const crypto = require('crypto');
  
  const expectedSignature = crypto
    .createHmac('sha256', wonderfulConfig.secretKey)
    .update(JSON.stringify(payload))
    .digest('hex');

  return signature === expectedSignature;
};

module.exports = {
  wonderfulConfig,
  wonderfulClient,
  createDonationSession,
  verifyDonation,
  getDonationDetails,
  verifyWebhookSignature,
};