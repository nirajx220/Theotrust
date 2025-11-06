import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
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

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About TheoTrust</Link></li>
              <li><Link to="/programs" className="text-gray-400 hover:text-white transition">Our Programs</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition">Events</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Programs</h4>
            <ul className="space-y-3">
              <li><Link to="/programs?program=ukraine" className="text-gray-400 hover:text-white transition">Ukraine Assistance</Link></li>
              <li><Link to="/programs?program=uk" className="text-gray-400 hover:text-white transition">UK Youngsters</Link></li>
              <li><Link to="/programs?program=overseas" className="text-gray-400 hover:text-white transition">Overseas Youngsters</Link></li>
              <li><Link to="/donate" className="text-gray-400 hover:text-white transition">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href="mailto:info@theotrust.org" className="text-white hover:text-gray-300">
                    info@theotrust.org
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href="tel:+442071234567" className="text-white hover:text-gray-300">
                    +44 20 7123 4567
                  </a>
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
  );
};

export default Footer;