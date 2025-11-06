import React, { useState } from 'react';
import { Heart, Globe, Users, GraduationCap, Menu, X, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const TheoTrustWebsite = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { value: '15,000+', label: 'Children Helped' },
    { value: '25+', label: 'Countries' },
    { value: '500+', label: 'Schools Built' }
  ];

  const programs = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Ukraine Assistance',
      description: 'Emergency educational support for Ukrainian children affected by conflict, providing safe learning environments and psychological support.',
      features: ['Mobile learning units', 'Trauma-informed education', 'Family support services']
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'UK Youngsters',
      description: 'Supporting disadvantaged youth in the UK with educational opportunities, mentorship programs, and skills development initiatives.',
      features: ['After-school programs', 'Mentorship networks', 'Skills workshops']
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Overseas Youngsters',
      description: 'Building schools and educational infrastructure in developing countries, providing access to quality education for remote communities.',
      features: ['School construction', 'Teacher training', 'Educational resources']
    }
  ];

  const donationTiers = [
    {
      amount: '£25',
      description: 'Provides school supplies for one child for a month',
      value: 25
    },
    {
      amount: '£100',
      description: "Sponsors one child's education for three months",
      value: 100
    },
    {
      amount: '£500',
      description: 'Funds a complete classroom setup',
      value: 500
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gray-900 rounded-full p-2">
                <Heart className="w-6 h-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TheoTrust</h1>
                <p className="text-xs text-gray-600">Empowering Children Globally</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-gray-900">About TheoTrust</a>
              <a href="#programs" className="text-gray-700 hover:text-gray-900">Our Programs</a>
              <a href="#events" className="text-gray-700 hover:text-gray-900">Fundraising Events</a>
              <a href="#accounts" className="text-gray-700 hover:text-gray-900">Accounts</a>
              <a href="#management" className="text-gray-700 hover:text-gray-900">Management</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
              <button className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Donate Now</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <a href="#about" className="text-gray-700">About TheoTrust</a>
                <a href="#programs" className="text-gray-700">Our Programs</a>
                <a href="#events" className="text-gray-700">Fundraising Events</a>
                <a href="#accounts" className="text-gray-700">Accounts</a>
                <a href="#management" className="text-gray-700">Management</a>
                <a href="#contact" className="text-gray-700">Contact</a>
                <button className="bg-gray-900 text-white px-6 py-2 rounded-full w-full">
                  Donate Now
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gray-700 bg-opacity-50 rounded-full px-4 py-2 mb-6">
                <span className="text-yellow-400">✨</span>
                <span className="text-sm">Transforming Lives Since 2004</span>
              </div>
              
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Transforming Lives Through Education
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                TheoTrust is dedicated to providing educational opportunities for deprived children across the globe, breaking the cycle of poverty through learning and empowerment.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full hover:bg-gray-100 transition flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span className="font-semibold">Make a Donation</span>
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-gray-900 transition flex items-center space-x-2">
                  <span>▶</span>
                  <span className="font-semibold">Learn More</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=600&fit=crop" 
                  alt="Children learning together"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-gray-900 rounded-lg p-2">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Education First</h3>
                      <p className="text-sm text-gray-600">Building Better Futures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-700 bg-opacity-50 rounded-2xl p-6">
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">GLOBAL IMPACT</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Global Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TheoTrust operates across multiple regions, providing targeted support where it's needed most
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition">
                <div className="bg-gray-900 rounded-xl p-4 inline-block mb-6">
                  <div className="text-white">{program.icon}</div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition font-semibold">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-red-500 bg-opacity-20 rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
              <span className="text-sm font-semibold">MAKE A DIFFERENCE</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Your Donation Changes Lives</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every contribution, no matter the size, helps us provide education, hope, and a brighter future for children in need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {donationTiers.map((tier, index) => (
              <div key={index} className="bg-gray-700 bg-opacity-50 rounded-2xl p-8 hover:bg-opacity-70 transition">
                <h3 className="text-4xl font-bold mb-4">{tier.amount}</h3>
                <p className="text-gray-300 mb-8">{tier.description}</p>
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition">
                  Donate {tier.amount}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-white text-gray-900 px-10 py-4 rounded-full hover:bg-gray-100 transition font-semibold inline-flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Make a Custom Donation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-white rounded-full p-2">
                  <Heart className="w-5 h-5 text-gray-900" fill="currentColor" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">TheoTrust</h3>
                  <p className="text-xs text-gray-400">Empowering Children Globally</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Transforming lives through education and creating opportunities for children worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About TheoTrust</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Our Programs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Fundraising Events</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Accounts</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Management</a></li>
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-bold text-lg mb-4">Programs</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Ukraine Assistance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">UK Youngsters</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Overseas Youngsters</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Donate</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:info@theotrust.org" className="text-white hover:text-gray-300">info@theotrust.org</a>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+442071234567" className="text-white hover:text-gray-300">+44 20 7123 4567</a>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="text-white">London, United Kingdom</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 TheoTrust. All rights reserved. Registered Charity No. 1234567</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TheoTrustWebsite;