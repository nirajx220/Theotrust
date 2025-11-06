import React from 'react';
import { Heart, Target, Eye, Users, Award, TrendingUp, Globe, BookOpen } from 'lucide-react';

const AboutPage = () => {
  const milestones = [
    { year: '2004', title: 'Foundation', description: 'TheoTrust was established with a mission to transform lives through education' },
    { year: '2008', title: 'First School Built', description: 'Opened our first educational facility in a rural community' },
    { year: '2012', title: 'International Expansion', description: 'Extended programs to 10+ countries worldwide' },
    { year: '2015', title: '10,000 Children Milestone', description: 'Reached our goal of helping 10,000 children' },
    { year: '2020', title: 'Digital Learning Initiative', description: 'Launched online education programs during global pandemic' },
    { year: '2024', title: 'Current Impact', description: '15,000+ children helped across 25+ countries' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Compassion',
      description: 'We lead with empathy and genuine care for every child we serve'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in all our educational programs'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We work together with communities, partners, and donors'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Impact',
      description: 'We focus on creating measurable, lasting change in children\'s lives'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: '20+ years in international development and education'
    },
    {
      name: 'Michael Chen',
      role: 'Director of Programs',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Expert in educational infrastructure and community development'
    },
    {
      name: 'Emma Williams',
      role: 'Head of Fundraising',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'Strategic fundraising leader with global NGO experience'
    },
    {
      name: 'James Patterson',
      role: 'Operations Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      bio: 'Logistics and operations specialist for international programs'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Schools Built', icon: <BookOpen className="w-6 h-6" /> },
    { number: '25+', label: 'Countries', icon: <Globe className="w-6 h-6" /> },
    { number: '15,000+', label: 'Children Helped', icon: <Users className="w-6 h-6" /> },
    { number: '98%', label: 'Satisfaction Rate', icon: <Award className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">About TheoTrust</h1>
            <p className="text-xl text-gray-300">
              Since 2004, we've been dedicated to breaking the cycle of poverty through education, 
              empowering children across the globe to build brighter futures.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10">
              <div className="bg-blue-600 rounded-2xl p-4 inline-block mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
                To provide quality educational opportunities to deprived children worldwide, 
                breaking the cycle of poverty through learning, empowerment, and sustainable development. 
                We believe every child deserves access to education regardless of their circumstances.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-10">
              <div className="bg-purple-600 rounded-2xl p-4 inline-block mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700">
                A world where every child has access to quality education and the opportunity to reach 
                their full potential. We envision thriving communities where education serves as the 
                foundation for sustainable development and social transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we serve communities worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition">
                <div className="bg-gray-900 rounded-full p-4 inline-block mb-6">
                  <div className="text-white">{value.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Two decades of transforming lives through education
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block"></div>

            {milestones.map((milestone, index) => (
              <div key={index} className={`relative mb-12 md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
                    <div className="inline-block bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-900 rounded-full border-4 border-white shadow hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable results that demonstrate our commitment to changing lives
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 text-center hover:bg-opacity-20 transition">
                <div className="bg-white bg-opacity-20 rounded-full p-4 inline-block mb-4">
                  <div className="text-white">{achievement.icon}</div>
                </div>
                <h3 className="text-4xl font-bold mb-2">{achievement.number}</h3>
                <p className="text-gray-300">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to making a difference in children's lives
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Us in Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            Together, we can transform more lives and create lasting change through education
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition font-semibold">
              Make a Donation
            </button>
            <button className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full hover:bg-gray-900 hover:text-white transition font-semibold">
              Become a Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;