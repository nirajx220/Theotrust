// src/pages/Home.jsx
import React from 'react';
import { Heart, Globe, GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Programs from '../components/home/Programs';
import DonationSection from '../components/home/DonationSection';

const Home = () => {
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
      <Hero />
      <Stats />
      <Programs />
      <DonationSection />

      {/* Footer */}
      
    </div>
  );
};

export default Home;
