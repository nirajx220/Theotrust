// client/src/components/donation/CheckoutForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDonation } from '../../hooks/useDonation';
import { Heart, Lock, CreditCard } from 'lucide-react';

const CheckoutForm = ({ donationData, setDonationData }) => {
  const { processDonation, loading, error, success } = useDonation();
  const [cardComplete, setCardComplete] = useState(false);

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