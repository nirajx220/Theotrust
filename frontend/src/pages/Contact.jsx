import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, Globe } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general',
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(data.message || 'Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Address',
      content: 'Paradise Farm, Burton Rd., Needwood',
      content2: 'Burton on Trent, Staffs. DE13 9PB',
      link: 'https://maps.google.com/?q=Paradise+Farm+Burton+Rd+Needwood+Burton+on+Trent+DE13+9PB',
      bgColor: 'bg-gradient-to-br from-red-100 to-pink-100',
      iconColor: 'text-red-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      content: '+44 7976 427791',
      link: 'tel:+447976427791',
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconColor: 'text-green-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      content: 'theotrust1998@gmail.com',
      link: 'mailto:theotrust1998@gmail.com',
      bgColor: 'bg-gradient-to-br from-purple-100 to-violet-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: 'Website',
      content: 'www.theotrust.org',
      link: 'https://theotrust.org',
      bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      iconColor: 'text-blue-600',
    },
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'donation', label: 'Donation Information' },
    { value: 'volunteer', label: 'Volunteer Opportunity' },
    { value: 'partnership', label: 'Partnership Proposal' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative text-white pt-4 pb-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80')`,
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[100px]">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Get In Touch</h1>
              <p className="text-base md:text-lg text-gray-100 max-w-3xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Cards in horizontal layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-8 relative z-20">
        <div className="grid md:grid-cols-12 gap-5 mb-5">
          {/* Contact Information - Narrower with Hover Effect */}
          <div className="md:col-span-4 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">Contact Information</h2>
            
            <div className="space-y-5">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:scale-105 group">
                  <div className={`flex-shrink-0 w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center ${info.iconColor} transition-all duration-200 group-hover:scale-110 group-hover:shadow-md`}>
                    {info.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">{info.title}</h3>
                    <p className="text-gray-600 text-sm leading-snug">{info.content}</p>
                    {info.content2 && (
                      <p className="text-gray-600 text-sm leading-snug">{info.content2}</p>
                    )}
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center mt-1.5 transition-colors duration-200 hover:underline"
                    >
                      Visit →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form - Wider with Hover Effect */}
          <div className="md:col-span-8 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Send Us a Message</h2>

            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">
                  Thank you for your message! We'll get back to you within 24-48 hours.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-500"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-500"
                    placeholder="userId@gmail.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-500"
                    placeholder="+44 1234 567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Inquiry Type *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 text-sm border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-500"
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-500"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2.5 text-sm border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 hover:border-blue-500"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Full Width Map - Satellite View & Zoomed Out with Hover Effect */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38654.5!2d-1.75!3d52.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDUxJzAwLjAiTiAxwrA0NScwMC4wIlc!5e1!3m2!1sen!2suk!4v1234567890"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TheoTrust Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;