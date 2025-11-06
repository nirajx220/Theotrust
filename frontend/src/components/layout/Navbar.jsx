import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Users } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gray-900 rounded-full p-2">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TheoTrust</h1>
              <p className="text-xs text-gray-600">Empowering Children Globally</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className={`${isActive('/about') ? 'text-gray-900 font-semibold' : 'text-gray-700'} hover:text-gray-900`}
            >
              About TheoTrust
            </Link>
            <Link 
              to="/programs" 
              className={`${isActive('/programs') ? 'text-gray-900 font-semibold' : 'text-gray-700'} hover:text-gray-900`}
            >
              Our Programs
            </Link>
            <Link 
              to="/events" 
              className={`${isActive('/events') ? 'text-gray-900 font-semibold' : 'text-gray-700'} hover:text-gray-900`}
            >
              Events
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'text-gray-900 font-semibold' : 'text-gray-700'} hover:text-gray-900`}
            >
              Contact
            </Link>
            <Link 
              to="/donate"
              className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Donate Now</span>
            </Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/about" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                About TheoTrust
              </Link>
              <Link to="/programs" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                Our Programs
              </Link>
              <Link to="/events" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                Events
              </Link>
              <Link to="/contact" className="text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link 
                to="/donate"
                className="bg-gray-900 text-white px-6 py-2 rounded-full w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;