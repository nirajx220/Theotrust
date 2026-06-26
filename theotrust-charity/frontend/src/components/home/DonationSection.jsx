import React from 'react';
import { Link } from 'react-router-dom';

const DonationSection = () => {
  return (
    <section className="py-12 bg-blue-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
        <p className="text-lg mb-6">Your donation can change a child's life</p>
        <Link to="/donate" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Donate Now
        </Link>
      </div>
    </section>
  );
};

export default DonationSection;