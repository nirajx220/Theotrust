import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import WonderfulCheckout from '../components/donation/WonderfulCheckout';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Donate = () => {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  const donationAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountClick = (amt) => {
    setAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && !isNaN(value) && Number(value) > 0) {
      setAmount(Number(value));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Difference Today
          </h1>
          <p className="text-xl text-gray-600">
            Your donation changes lives. 100% goes directly to helping children.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Amount Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Choose Your Impact</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {donationAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => handleAmountClick(amt)}
                  className={`py-4 px-4 rounded-lg font-semibold transition ${
                    amount === amt && !customAmount
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter a custom amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 text-lg">$</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="1"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-2">Your Impact:</h3>
              {amount >= 10 && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <p className="text-sm text-gray-700">
                    Provide school supplies for a child
                  </p>
                </div>
              )}
              {amount >= 50 && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <p className="text-sm text-gray-700">
                    Support a child's education for one month
                  </p>
                </div>
              )}
              {amount >= 100 && (
                <div className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <p className="text-sm text-gray-700">
                    Provide meals and healthcare for a family
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Checkout */}
          <WonderfulCheckout amount={amount} />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-center mb-6">
            Why Donate Through Wonderful.org?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Zero Fees</h4>
              <p className="text-sm text-gray-600">
                100% of your donation goes to the charity
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Secure</h4>
              <p className="text-sm text-gray-600">
                Bank-level encryption protects your data
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold mb-2">Transparent</h4>
              <p className="text-sm text-gray-600">
                Track exactly where your money goes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;