
import React, { useState } from 'react';
import { Heart, CreditCard, Shield, Check, Gift, Users, BookOpen, Home, ArrowRight, Lock } from 'lucide-react';

const DonatePage = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('where-needed');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    anonymous: false
  });

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const programs = [
    { id: 'where-needed', name: 'Where Most Needed', icon: <Heart className="w-5 h-5" /> },
    { id: 'ukraine', name: 'Ukraine Assistance', icon: <Users className="w-5 h-5" /> },
    { id: 'uk-youngsters', name: 'UK Youngsters', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'overseas', name: 'Overseas Schools', icon: <Home className="w-5 h-5" /> }
  ];

  const impactExamples = [
    { amount: 25, impact: 'Provides school supplies for one child for a month' },
    { amount: 50, impact: 'Funds a week of after-school tutoring for 5 children' },
    { amount: 100, impact: 'Sponsors one child\'s education for three months' },
    { amount: 250, impact: 'Provides essential learning materials for an entire classroom' },
    { amount: 500, impact: 'Funds a complete classroom setup with furniture and supplies' },
    { amount: 1000, impact: 'Supports teacher training program for 10 educators' }
  ];

  const benefits = [
    { icon: <Shield className="w-6 h-6" />, title: 'Secure Payment', description: '256-bit SSL encryption' },
    { icon: <Gift className="w-6 h-6" />, title: 'Tax Deductible', description: 'Instant receipt provided' },
    { icon: <Heart className="w-6 h-6" />, title: '100% Impact', description: 'Every penny goes to programs' }
  ];

  const handleDonate = () => {
    const amount = customAmount || selectedAmount;
    console.log('Processing donation:', {
      amount,
      donationType,
      selectedProgram,
      donorInfo
    });
    // Here you would integrate with Stripe
    alert(`Processing £${amount} ${donationType} donation to ${selectedProgram}`);
  };

  const getCurrentImpact = () => {
    const amount = customAmount || selectedAmount;
    const impact = impactExamples.find(ex => ex.amount <= amount);
    return impact ? impact.impact : impactExamples[impactExamples.length - 1].impact;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-red-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
              <span className="text-sm font-semibold">MAKE A DIFFERENCE</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Your Donation Changes Lives</h1>
            <p className="text-xl text-gray-300">
              Every contribution helps us provide education, hope, and opportunity to children in need around the world
            </p>
          </div>
        </div>
      </section>

      {/* Main Donation Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                {/* Donation Type */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Donation Type</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`p-4 rounded-xl border-2 transition ${
                        donationType === 'one-time'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Gift className={`w-6 h-6 mx-auto mb-2 ${donationType === 'one-time' ? 'text-blue-600' : 'text-gray-600'}`} />
                      <p className={`font-semibold ${donationType === 'one-time' ? 'text-blue-600' : 'text-gray-900'}`}>
                        One-Time
                      </p>
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`p-4 rounded-xl border-2 transition ${
                        donationType === 'monthly'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <Heart className={`w-6 h-6 mx-auto mb-2 ${donationType === 'monthly' ? 'text-blue-600' : 'text-gray-600'}`} />
                      <p className={`font-semibold ${donationType === 'monthly' ? 'text-blue-600' : 'text-gray-900'}`}>
                        Monthly
                      </p>
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Amount (GBP)</h2>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`p-4 rounded-xl border-2 transition ${
                          selectedAmount === amount && !customAmount
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <p className={`text-2xl font-bold ${selectedAmount === amount && !customAmount ? 'text-blue-600' : 'text-gray-900'}`}>
                          £{amount}
                        </p>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Or enter custom amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">£</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 outline-none transition text-lg"
                        placeholder="Enter amount"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Program</h2>
                  <div className="space-y-3">
                    {programs.map((program) => (
                      <button
                        key={program.id}
                        onClick={() => setSelectedProgram(program.id)}
                        className={`w-full p-4 rounded-xl border-2 transition flex items-center space-x-3 ${
                          selectedProgram === program.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className={`${selectedProgram === program.id ? 'text-blue-600' : 'text-gray-600'}`}>
                          {program.icon}
                        </div>
                        <span className={`font-semibold flex-1 text-left ${selectedProgram === program.id ? 'text-blue-600' : 'text-gray-900'}`}>
                          {program.name}
                        </span>
                        {selectedProgram === program.id && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donor Information */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={donorInfo.firstName}
                          onChange={(e) => setDonorInfo({...donorInfo, firstName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none transition"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={donorInfo.lastName}
                          onChange={(e) => setDonorInfo({...donorInfo, lastName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none transition"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={donorInfo.email}
                        onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={donorInfo.phone}
                        onChange={(e) => setDonorInfo({...donorInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 outline-none transition"
                        placeholder="+44 20 1234 5678"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={donorInfo.anonymous}
                        onChange={(e) => setDonorInfo({...donorInfo, anonymous: e.target.checked})}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="anonymous" className="text-gray-700">
                        Make my donation anonymous
                      </label>
                    </div>
                  </div>
                </div>

                {/* Payment Section Placeholder */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Method</h2>
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-semibold mb-2">Stripe Payment Integration</p>
                      <p className="text-sm text-gray-500">
                        Secure payment processing will be integrated here
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleDonate}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition font-bold text-lg flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Lock className="w-5 h-5" />
                  <span>Complete Donation - £{customAmount || selectedAmount}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                  🔒 Your payment information is secure and encrypted
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Summary */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Impact</h3>
                <div className="bg-white rounded-2xl p-6 mb-6">
                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-blue-600 mb-2">
                      £{customAmount || selectedAmount}
                    </p>
                    <p className="text-sm text-gray-600 uppercase tracking-wide">
                      {donationType} Donation
                    </p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {getCurrentImpact()}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-white rounded-lg p-2">
                        <div className="text-blue-600">{benefit.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Donate to TheoTrust?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">Registered Charity No. 1234567</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">95% of funds go directly to programs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">Transparent financial reporting</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <p className="text-sm text-gray-700">20+ years of proven impact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Other Ways to Give</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Bank Transfer', description: 'Direct transfer to our charity account', icon: <CreditCard className="w-8 h-8" /> },
              { title: 'Corporate Giving', description: 'Match employee donations or sponsor programs', icon: <Users className="w-8 h-8" /> },
              { title: 'Legacy Giving', description: 'Leave a lasting impact through your will', icon: <Heart className="w-8 h-8" /> }
            ].map((method, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <div className="text-blue-600">{method.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <button className="text-blue-600 font-semibold hover:text-blue-700">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonatePage;