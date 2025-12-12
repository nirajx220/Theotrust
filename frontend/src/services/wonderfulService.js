import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class WonderfulService {
  // Create donation
  async createDonation(donationData) {
    try {
      const response = await axios.post(`${API_URL}/donations`, donationData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verify donation
  async verifyDonation(sessionId) {
    try {
      const response = await axios.get(`${API_URL}/donations/verify/${sessionId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get donation stats
  async getDonationStats() {
    try {
      const response = await axios.get(`${API_URL}/donations/stats`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Redirect to Wonderful.org payment
  redirectToPayment(sessionUrl) {
    window.location.href = sessionUrl;
  }

  // Handle errors
  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error(error.message || 'An unexpected error occurred');
    }
  }
}

export const getStripe = () => stripePromise;

export default new WonderfulService();