import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Programs from '../components/home/Programs';
import DonationSection from '../components/home/DonationSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <Hero />
      <Stats />
      <Programs />
      <DonationSection />
    </div>
  );
};

export default Home;
