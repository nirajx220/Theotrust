import React, { useState } from 'react';
import { Heart, Users, Award, TrendingUp, Target, DollarSign, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const fundraisingWays = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Individual Fundraising',
      description: 'Create your own fundraising page and rally your friends and family to support our cause. Set your goal and track your progress.',
      color: 'from-pink-500 to-rose-500',
      features: ['Personal fundraising page', 'Social media sharing tools', 'Progress tracking', 'Email notifications'],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Challenges',
      description: 'Organize a team event at work, school, or in your community to raise funds together. Compete and collaborate for a cause.',
      color: 'from-blue-500 to-indigo-500',
      features: ['Team leaderboards', 'Collaborative goals', 'Group activities', 'Team recognition'],
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Corporate Sponsorship',
      description: 'Partner with us for corporate social responsibility and make a lasting impact. Strengthen your brand while supporting the community.',
      color: 'from-purple-500 to-violet-500',
      features: ['Brand visibility', 'Tax benefits', 'Employee engagement', 'Impact reports'],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Online Campaigns',
      description: 'Launch digital fundraising campaigns on social media and reach a wider audience. Use the power of digital platforms.',
      color: 'from-green-500 to-emerald-500',
      features: ['Social media integration', 'Viral campaign tools', 'Analytics dashboard', 'Digital marketing support'],
    },
  ];

  const impactStats = [
    { label: 'Total Raised in 2025', value: '£250,000+', icon: <Target className="w-6 h-6" />, color: 'from-blue-500 to-indigo-500' },
    { label: 'Active Fundraisers', value: '340+', icon: <Users className="w-6 h-6" />, color: 'from-purple-500 to-violet-500' },
    { label: 'Lives Impacted', value: '1,500+', icon: <Heart className="w-6 h-6" />, color: 'from-pink-500 to-rose-500' },
    { label: 'Campaigns Launched', value: '85', icon: <TrendingUp className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
  ];

  const successStories = [
    {
      name: 'Sarah Johnson',
      amount: '£5,000',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      story: 'Organized a charity marathon and exceeded her goal by 150%. Her dedication inspired 50+ runners to participate.',
      type: 'Individual',
    },
    {
      name: 'TechCorp Solutions',
      amount: '£25,000',
      image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&q=80',
      story: 'Corporate partnership that funded educational programs for 100 underprivileged children over 6 months.',
      type: 'Corporate',
    },
    {
      name: 'Green Valley School',
      amount: '£8,500',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80',
      story: 'Students organized a bake sale and art auction, bringing the entire community together for a great cause.',
      type: 'Team',
    },
  ];

  const fundraisingTips = [
    {
      title: 'Set a Clear Goal',
      description: 'Define what you want to achieve and communicate it clearly to your supporters.',
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: 'Tell Your Story',
      description: 'Share why this cause matters to you. Personal stories create emotional connections.',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      title: 'Use Social Media',
      description: 'Leverage Facebook, Instagram, and Twitter to reach a wider audience.',
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: 'Show Appreciation',
      description: 'Thank your donors publicly and privately. Recognition encourages more support.',
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: 'Update Regularly',
      description: 'Keep supporters informed about your progress and how funds are being used.',
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: 'Make it Easy',
      description: 'Provide simple donation options and clear instructions on how to support.',
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Start Fundraising Today</h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Every contribution counts. Whether you're an individual, team, or organization, you can make a real difference in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Start Your Campaign
              </button>
              <Link
                to="/events"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                View Fundraising Events
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300"
            >
              <div className={`flex justify-center mb-3 text-indigo-600`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ways to Fundraise */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Fundraising Method</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select the approach that best fits your goals and resources. We provide tools and support for every method.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {fundraisingWays.map((way, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-orange-100 group"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${way.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {way.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{way.title}</h3>
                <p className="text-gray-600 mb-6">{way.description}</p>
                
                <div className="space-y-2 mb-6">
                  {way.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
                  <span className="relative">Get Started</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real people making real impact. See how our fundraisers have changed lives.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {story.amount}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-indigo-600">
                    {story.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{story.name}</h3>
                  <p className="text-gray-600 text-sm">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fundraising Tips */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fundraising Tips & Best Practices</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Maximize your impact with these proven strategies from successful fundraisers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundraisingTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
            Join hundreds of fundraisers who have already raised over £250,000 for our cause. Your campaign could be next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Create Campaign
            </button>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;