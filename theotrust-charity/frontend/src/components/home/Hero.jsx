import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering Children Globally
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Breaking the cycle of poverty through education
        </p>
        <Link 
          to="/donate"
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition shadow-lg"
        >
          Donate Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;