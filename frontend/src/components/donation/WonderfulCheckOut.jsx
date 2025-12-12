// client/src/components/donation/CheckoutForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDonation } from '../../hooks/useDonation';
import { Heart, Lock, CreditCard } from 'lucide-react';
import wonderfulService from '../../services/wonderfulService';
import Loading from '../common/Loading';
import { ArrowLeft } from 'lucide-react';

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

  const [email, setEmail] = useState('');
  const [shareEmail, setShareEmail] = useState(false);
  const [giftAid, setGiftAid] = useState(false);
  const [title, setTitle] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [loadingWonderful, setLoadingWonderful] = useState(false);
  const [errorWonderful, setErrorWonderful] = useState('');

  const handleWonderfulChange = (e) => {
    const { name, value, type, checked } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'shareEmail':
        setShareEmail(checked);
        break;
      case 'giftAid':
        setGiftAid(checked);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'houseNumber':
        setHouseNumber(value);
        break;
      case 'postCode':
        setPostCode(value);
        break;
      default:
        break;
    }
  };

  const handleWonderfulSubmitForm = async (e) => {
    e.preventDefault();
    setLoadingWonderful(true);
    setErrorWonderful('');

    try {
      const donationData = {
        amount: donationData.amount,
        donorEmail: email,
        donorName: `${firstName} ${lastName}`,
        giftAid,
        address: {
          title,
          houseNumber,
          postCode,
        },
      };

      const response = await wonderfulService.createDonation(donationData);

      if (response.success && response.sessionUrl) {
        wonderfulService.redirectToPayment(response.sessionUrl);
      } else {
        setErrorWonderful('Failed to create donation session');
      }
    } catch (err) {
      setErrorWonderful(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoadingWonderful(false);
    }
  };

  const giftAidAmount = giftAid ? (donationData.amount * 0.25).toFixed(2) : '0.00';

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

        <form onSubmit={handleWonderfulSubmitForm}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleWonderfulChange}
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
              onChange={handleWonderfulChange}
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
              onChange={handleWonderfulChange}
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

      {/* Wonderful Checkout Component */}
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-blue-600 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:underline mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="text-center">
              <div className="inline-block bg-white rounded-full px-6 py-2">
                <h1 className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'cursive' }}>
                  wonderful
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Your Details Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Your details</h2>

              {errorWonderful && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {errorWonderful}
                </div>
              )}

              <form onSubmit={handleWonderfulSubmitForm}>
                {/* Email */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleWonderfulChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    placeholder="your@email.com"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    We will send a receipt for your donation.
                  </p>
                  
                  <label className="flex items-start gap-3 mt-4 cursor-pointer">
                    <input
                      type="checkbox"
                      name="shareEmail"
                      checked={shareEmail}
                      onChange={handleWonderfulChange}
                      className="mt-1 w-5 h-5 border-2 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Share my email address with <strong>Theo Trust</strong>.
                    </span>
                  </label>
                </div>

                {/* Gift Aid Section */}
                {giftAid && (
                  <div className="mb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Title</label>
                        <input
                          type="text"
                          name="title"
                          value={title}
                          onChange={handleWonderfulChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                          placeholder="Mr/Mrs/Ms"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">First name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={handleWonderfulChange}
                          required={giftAid}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleWonderfulChange}
                        required={giftAid}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">House name or number</label>
                        <input
                          type="text"
                          name="houseNumber"
                          value={houseNumber}
                          onChange={handleWonderfulChange}
                          required={giftAid}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Post code</label>
                        <input
                          type="text"
                          name="postCode"
                          value={postCode}
                          onChange={handleWonderfulChange}
                          required={giftAid}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                          placeholder="SW1A 1AA"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Gift Aid Toggle */}
                <div className="mb-8 bg-blue-50 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'cursive' }}>
                      giftaid it
                    </div>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="giftAid"
                      checked={giftAid}
                      onChange={handleWonderfulChange}
                      className="mt-1 w-5 h-5 border-2 border-gray-300 rounded"
                    />
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        <strong>Add £{giftAidAmount}</strong> at no cost to you.
                      </p>
                      <p className="text-xs text-gray-600">
                        I am a UK taxpayer and I want to Gift Aid this donation and any donations I make 
                        in the future or have made in the past 4 years to Theo Trust.
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            </div>

            {/* Right Column - Payment Methods */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pay instantly</h2>
              <p className="text-gray-600 mb-8">Donate using your bank's app.</p>

              {/* Bank Icons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-blue-500 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-blue-500 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-red-500 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-700 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-green-500 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-red-600 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-red-500 font-bold">🏦</span>
                </div>
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-semibold">20+</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-8">Simple, fast and secure</p>

              {/* Select Bank Button */}
              <button
                onClick={handleWonderfulSubmitForm}
                disabled={loadingWonderful || !email}
                className="w-full bg-blue-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed mb-8"
              >
                {loadingWonderful ? <Loading /> : 'Select your bank'}
              </button>

              {/* Donation Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Your donation summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donation:</span>
                    <span className="font-semibold">£{amount.toFixed(2)}</span>
                  </div>
                  {giftAid && (
                    <div className="flex justify-between text-green-600">
                      <span>Gift Aid:</span>
                      <span className="font-semibold">+£{giftAidAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform fee:</span>
                    <span className="font-semibold text-green-600">£0.00</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                    <span className="font-bold">Total Impact:</span>
                    <span className="font-bold text-blue-600 text-lg">
                      £{(parseFloat(amount) + parseFloat(giftAidAmount)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 py-8 mt-12">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm text-gray-600 text-center mb-2">
              © Wonderful Organisation 2024.
            </p>
            <p className="text-xs text-gray-500 text-center">
              This charity is registered with the Charity Commission: 1069814 - THEO TRUST
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;