
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Facebook, Twitter, Instagram, Linkedin, MessageSquare, HelpCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would integrate with your backend API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'Email Us',
      details: ['info@theotrust.org', 'support@theotrust.org'],
      description: 'We typically respond within 24 hours'
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Call Us',
      details: ['+44 20 7123 4567', '+44 20 7123 4568'],
      description: 'Mon-Fri: 9:00 AM - 6:00 PM GMT'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Visit Us',
      details: ['123 Charity Lane', 'London, EC1A 1BB', 'United Kingdom'],
      description: 'By appointment only'
    }
  ];

  const offices = [
    {
      city: 'London, UK',
      address: '123 Charity Lane, London EC1A 1BB',
      phone: '+44 20 7123 4567',
      email: 'london@theotrust.org'
    },
    {
      city: 'New York, USA',
      address: '456 Nonprofit Ave, NY 10001',
      phone: '+1 212 555 0123',
      email: 'newyork@theotrust.org'
    },
    {
      city: 'Nairobi, Kenya',
      address: '789 Education Rd, Nairobi',
      phone: '+254 20 123 4567',
      email: 'nairobi@theotrust.org'
    }
  ];

  const faqs = [
    {
      question: 'How can I make a donation?',
      answer: 'You can donate online through our secure payment portal, by bank transfer, or by sending a cheque to our office.'
    },
    {
      question: 'Can I visit your projects?',
      answer: 'Yes! We organize regular visits for donors and supporters. Please contact us to arrange a visit to one of our project sites.'
    },
    {
      question: 'How do I become a volunteer?',
      answer: 'We welcome volunteers! Fill out our volunteer application form and our team will contact you about available opportunities.'
    },
    {
      question: 'Are donations tax-deductible?',
      answer: 'Yes, TheoTrust is a registered charity. All donations are tax-deductible and you will receive a receipt for your records.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300">
              Have questions or want to get involved? We'd love to hear from you. 
              Our team is here to help and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center hover:shadow-xl transition">
                <div className="bg-gray-900 rounded-full p-4 inline-block mb-6">
                  <div className="text-white">{method.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{method.title}</h3>
                {method.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 font-semibold mb-1">{detail}</p>
                ))}
                <p className="text-gray-600 text-sm mt-4">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
              </div>

              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="donation">Donation</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl hover:bg-gray-800 transition font-semibold flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Map & Office Hours */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive Map</p>
                    <p className="text-sm text-gray-500">London Office Location</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                    { day: 'Sunday', hours: 'Closed' }
                  ].map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                      <span className="font-semibold text-gray-900">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h3>
                <p className="text-gray-700 mb-6">Stay connected on social media for updates and stories</p>
                <div className="flex space-x-4">
                  {[
                    { icon: <Facebook />, label: 'Facebook' },
                    { icon: <Twitter />, label: 'Twitter' },
                    { icon: <Instagram />, label: 'Instagram' },
                    { icon: <Linkedin />, label: 'LinkedIn' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="bg-white p-4 rounded-xl hover:bg-gray-900 hover:text-white transition group"
                      aria-label={social.label}
                    >
                      <div className="w-6 h-6 text-gray-900 group-hover:text-white transition">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Global Offices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have offices around the world to better serve communities and partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition">
                <div className="bg-blue-100 rounded-xl p-3 inline-block mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{office.city}</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">{office.address}</p>
                  <p className="text-gray-700 font-semibold">{office.phone}</p>
                  <p className="text-blue-600">{office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">HELP CENTER</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about TheoTrust
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-semibold">
              View All FAQs
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join us in transforming children's lives through education
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition font-semibold">
              Donate Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition font-semibold">
              Volunteer With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;