import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Users, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-gray-900 text-gray-100 sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/theo-trust-logo.png" 
              alt="Theo Trust Logo" 
              className="w-12 h-12 object-contain transition-transform group-hover:scale-110"
            />
            <div className="leading-tight">
              <div className="text-lg font-bold">TheoTrust</div>
              <div className="text-xs text-gray-400 -mt-1">Empowering Children Globally</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-200 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-gray-200 hover:text-white transition">About TheoTrust</Link>
            <Link to="/programs" className="text-gray-200 hover:text-white transition">Our Programs</Link>
            <Link to="/events" className="text-gray-200 hover:text-white transition">Fundraising Events</Link>
            <Link to="/accounts" className="text-gray-200 hover:text-white transition">Accounts</Link>
            <Link to="/management" className="text-gray-200 hover:text-white transition">Management</Link>
            <Link to="/contact" className="text-gray-200 hover:text-white transition">Contact</Link>

            <Link
              to="/donate"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-semibold shadow-sm hover:opacity-95 transition"
            >
              <Users className="w-4 h-4" />
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-800 pb-4 mt-2">
            <div className="flex flex-col px-2 space-y-2">
              <Link to="/" className="block py-2 px-3 rounded hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/about" className="block py-2 px-3 rounded hover:bg-gray-800" onClick={() => setMobileOpen(false)}>About TheoTrust</Link>
              <Link to="/programs" className="block py-2 px-3 rounded hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Our Programs</Link>
              <Link to="/events" className="block py-2 px-3 rounded hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Fundraising Events</Link>
              <Link to="/accounts" className="block py-2 px-3 rounded hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Accounts</Link>
              <Link to="/management" className="block py-2 px-3 rounded hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Management</Link>
              <Link to="/contact" className="block py-2 px-3 rounded hover:bg-gray-800" onClick={() => setMobileOpen(false)}>Contact</Link>

              <Link
                to="/donate"
                className="block mt-2 py-3 text-center bg-white text-gray-900 rounded-lg font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
