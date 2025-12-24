import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const WonderfulCheckout = ({ amount, onBack }) => {
  const [formData, setFormData] = useState({
    email: '',
    shareEmail: false,
    giftAid: false,
    title: '',
    firstName: '',
    lastName: '',
    houseNumber: '',
    postCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Donation data:', {
        amount,
        ...formData,
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Thank you for your donation!');
      onBack();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const giftAidAmount = formData.giftAid ? (amount * 0.25).toFixed(2) : '0.00';

  return (
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
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Your details</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                    checked={formData.shareEmail}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5"
                  />
                  <span className="text-sm text-gray-700">
                    Share my email address with <strong>Theo Trust</strong>.
                  </span>
                </label>
              </div>

              {/* Gift Aid Fields */}
              {formData.giftAid && (
                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                        placeholder="Mr/Mrs/Ms"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">First name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required={formData.giftAid}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Last name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required={formData.giftAid}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">House number *</label>
                      <input
                        type="text"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleChange}
                        required={formData.giftAid}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Post code *</label>
                      <input
                        type="text"
                        name="postCode"
                        value={formData.postCode}
                        onChange={handleChange}
                        required={formData.giftAid}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600"
                        placeholder="SW1A 1AA"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Gift Aid Toggle */}
              <div className="mb-8 bg-blue-50 rounded-lg p-6">
                <div className="text-2xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'cursive' }}>
                  giftaid it
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="giftAid"
                    checked={formData.giftAid}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5"
                  />
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Add £{giftAidAmount}</strong> at no cost to you.
                    </p>
                    <p className="text-xs text-gray-600">
                      I am a UK taxpayer and want to Gift Aid this donation.
                    </p>
                  </div>
                </label>
              </div>
            </form>
          </div>

          {/* Right Column */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pay instantly</h2>
            <p className="text-gray-600 mb-8">Donate using your bank's app.</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-white border-2 border-gray-200 rounded flex items-center justify-center">
                  <span className="text-xl">🏦</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-600 mb-8">Simple, fast and secure</p>

            <button
              onClick={handleSubmit}
              disabled={loading || !formData.email}
              className="w-full bg-blue-600 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 mb-8"
            >
              {loading ? 'Processing...' : 'Select your bank'}
            </button>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your donation summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donation:</span>
                  <span className="font-semibold">£{amount.toFixed(2)}</span>
                </div>
                {formData.giftAid && (
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-2">© Wonderful Organisation 2024.</p>
          <p className="text-xs text-gray-500">
            Charity Registration: 1069814 - THEO TRUST
          </p>
        </div>
      </div>
    </div>
  );
};

export default WonderfulCheckout;