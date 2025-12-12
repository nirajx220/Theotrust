// client/src/components/donation/CheckoutForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDonation } from '../../hooks/useDonation';
import { Heart, Lock, CreditCard } from 'lucide-react';
import wonderfulService from '../../services/wonderfulService';
import Loading from '../common/Loading';

const CheckoutForm = ({ donationData, setDonationData }) => {
  const { processDonation, loading, error, success } = useDonation();
  const [cardComplete, setCardComplete] = useState(false);
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    message: '',
  });
  const [wonderfulLoading, setWonderfulLoading] = useState(false);
  const [wonderfulError, setWonderfulError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cardComplete) {
      alert('Please enter your card details');
      return;
    }

    const result = await processDonation(donationData);
    
    if (result.success) {
      alert('Thank you for your donation! A receipt has been sent to your email.');
      // Redirect or show success message
    }
  };

  const handleWonderfulSubmit = async (e) => {
    e.preventDefault();
    setWonderfulLoading(true);
    setWonderfulError('');

    try {
      const donationData = {
        amount: donationData.amount,
        ...formData,
      };

      const response = await wonderfulService.createDonation(donationData);

      if (response.success && response.sessionUrl) {
        // Redirect to Wonderful.org payment page
        wonderfulService.redirectToPayment(response.sessionUrl);
      } else {
        setWonderfulError('Failed to create donation session');
      }
    } catch (err) {
      setWonderfulError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setWonderfulLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8">
      {/* Donor Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Your Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={donationData.firstName}
            onChange={(e) => setDonationData({...donationData, firstName: e.target.value})}
            required
            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={donationData.lastName}
            onChange={(e) => setDonationData({...donationData, lastName: e.target.value})}
            required
            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none"
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={donationData.email}
          onChange={(e) => setDonationData({...donationData, email: e.target.value})}
          required
          className="w-full mt-4 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Amount Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Donation Amount</h2>
        <div className="grid grid-cols-3 gap-4">
          {[25, 50, 100, 250, 500, 1000].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setDonationData({...donationData, amount})}
              className={`p-4 rounded-xl border-2 transition ${
                donationData.amount === amount
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <p className={`text-2xl font-bold ${
                donationData.amount === amount ? 'text-blue-600' : 'text-gray-900'
              }`}>
                £{amount}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Card Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <CreditCard className="w-6 h-6 mr-2" />
          Payment Details
        </h2>
        <div className="p-4 border-2 border-gray-300 rounded-xl">
          <CardElement
            options={cardElementOptions}
            onChange={(e) => setCardComplete(e.complete)}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl">
          Thank you for your donation! A receipt has been sent to your email.
        </div>
      )}

      {/* Wonderful Checkout Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Or Donate via Wonderful.org</h2>
        
        {wonderfulError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
            {wonderfulError}
          </div>
        )}

        <form onSubmit={handleWonderfulSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Leave a message for the charity..."
              maxLength="500"
            />
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Donation Amount:</span>
              <span className="text-2xl font-bold text-blue-600">${donationData.amount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="text-green-600 font-semibold">$0.00</span>
            </div>
            <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between items-center">
              <span className="font-semibold text-gray-700">You Donate:</span>
              <span className="text-2xl font-bold text-blue-600">${donationData.amount}</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              ✨ 100% of your donation goes directly to the charity - no fees!
            </p>
          </div>

          <button
            type="submit"
            disabled={wonderfulLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {wonderfulLoading ? <Loading /> : `Donate $${donationData.amount} Now`}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Powered by Wonderful.org - Secure & Zero Fee Platform
          </p>
        </form>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !cardComplete}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition font-bold text-lg flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock className="w-5 h-5" />
        <span>
          {loading ? 'Processing...' : `Donate £${donationData.amount}`}
        </span>
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        🔒 Your payment information is secure and encrypted
      </p>
    </form>
  );
};

export default CheckoutForm;