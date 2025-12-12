import { useState } from 'react';
import WonderfulCheckout from '../components/donation/WonderfulCheckout';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const predefinedAmounts = [10, 25, 50];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value));
    }
  };

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  if (showCheckout) {
    return <WonderfulCheckout amount={finalAmount} onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block bg-white rounded-full px-6 py-2">
            <h1 className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'cursive' }}>
              wonderful
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Charity Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Theo Trust</h2>
            <p className="text-gray-600 mb-6">Charity Registration Number: 1069814</p>

            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <img 
                  src="/theo-trust-logo.png" 
                  alt="Theo Trust Logo" 
                  className="w-64 h-64 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-64 h-64 bg-red-100 rounded-full items-center justify-center border-8 border-white shadow-lg">
                  <div className="text-center">
                    <div className="text-red-600 text-sm font-semibold mb-2">giving deprived children</div>
                    <div className="bg-red-600 text-white px-6 py-3 rounded-full text-2xl font-bold mb-2">
                      THEO<br/>TRUST
                    </div>
                    <div className="text-red-600 text-sm font-semibold">the chance to prosper</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <a href="https://www.theotrust.org" className="text-blue-600 hover:underline text-lg">
                www.theotrust.org
              </a>
              <p className="text-sm text-gray-500 mt-1">Registered Charity No. 1069814</p>
            </div>

            {/* Info Box */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Your donation</h3>
              <p className="text-gray-700 mb-2">
                Unlike other platforms, Wonderful <strong>does not</strong> charge charities platform fees, 
                processing fees or Gift Aid fees, and <strong>will never</strong> ask donors for voluntary contributions.
              </p>
            </div>
          </div>

          {/* Right Column - Donation Form */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Select an amount to give</h3>
              
              {/* Amount Buttons */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-4 px-6 rounded-full text-lg font-semibold transition ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    £{amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-3">
                  Or enter a different amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-xl font-semibold bg-blue-600 px-3 py-2 rounded-l">
                    £
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-16 pr-4 py-3 border-2 border-gray-300 rounded text-xl focus:outline-none focus:border-blue-600"
                    placeholder="25"
                  />
                </div>
              </div>

              {/* Continue Button */}
              <button
                onClick={() => setShowCheckout(true)}
                disabled={!finalAmount || finalAmount < 1}
                className="w-full bg-blue-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>

            {/* Gift Aid Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-4xl font-bold text-blue-600" style={{ fontFamily: 'cursive' }}>
                  giftaid it
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Add <strong>£{(finalAmount * 0.25).toFixed(2)}</strong> at no cost to you.
              </p>
              <details className="text-sm text-gray-700">
                <summary className="cursor-pointer font-medium text-blue-600 hover:underline">
                  Learn more about Gift Aid
                </summary>
                <div className="mt-3 space-y-2">
                  <p>
                    I am a UK taxpayer and I want to Gift Aid this donation and any donations I make in 
                    the future or have made in the past 4 years to Theo Trust.
                  </p>
                  <p>
                    I understand that if I pay less Income Tax and/or Capital Gains Tax than the amount 
                    of Gift Aid claimed on all my donations in that tax year it is my responsibility to 
                    pay any difference.
                  </p>
                </div>
              </details>
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
          <p className="text-xs text-gray-500 text-center mb-1">
            The processing of payments is facilitated by <strong>Wonderful Payments Limited</strong> whose 
            registered office is 41 Luke Street, London EC2A 4DP and who may be contacted{' '}
            <a href="#" className="text-blue-600 hover:underline">here</a>.
          </p>
          <p className="text-xs text-gray-500 text-center mb-1">
            Wonderful Payments Limited is regulated by the Financial Conduct Authority. 
            The FCA may be contacted{' '}
            <a href="#" className="text-blue-600 hover:underline">here</a>.
          </p>
          <p className="text-xs text-gray-500 text-center">
            This charity is registered with the Charity Commission: 1069814 - THEO TRUST
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;