
import React, { useState } from 'react';
import { Globe, Heart, Users, BookOpen, Home, Lightbulb, Briefcase, MapPin, Calendar, ArrowRight } from 'lucide-react';

const ProgramsPage = () => {
  const [selectedProgram, setSelectedProgram] = useState('all');

  const programs = [
    {
      id: 'ukraine',
      category: 'Emergency Relief',
      icon: <Globe className="w-12 h-12" />,
      title: 'Ukraine Assistance',
      subtitle: 'Emergency Educational Support',
      description: 'Providing critical educational support to Ukrainian children affected by conflict. Our comprehensive program ensures children continue learning in safe environments while receiving psychological support.',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
      stats: [
        { number: '2,500+', label: 'Children Served' },
        { number: '15', label: 'Learning Centers' },
        { number: '120', label: 'Trained Teachers' }
      ],
      features: [
        {
          icon: <Home className="w-6 h-6" />,
          title: 'Mobile Learning Units',
          description: 'Portable classrooms that bring education to displaced children in safe zones'
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: 'Trauma-Informed Education',
          description: 'Specialized teaching methods that help children cope with conflict experiences'
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Family Support Services',
          description: 'Counseling and resources for families to create stable learning environments'
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Digital Learning Tools',
          description: 'Technology-enabled education for remote and hybrid learning situations'
        }
      ],
      locations: ['Kyiv', 'Lviv', 'Kharkiv', 'Odesa'],
      impact: 'Since 2022, we\'ve provided uninterrupted education to over 2,500 children, helping them maintain academic progress and emotional wellbeing during crisis.',
      howToHelp: [
        'Sponsor a child\'s education for £50/month',
        'Donate educational supplies and materials',
        'Fund a mobile learning unit for £5,000',
        'Support teacher training programs'
      ]
    },
    {
      id: 'uk-youngsters',
      category: 'Youth Development',
      icon: <Briefcase className="w-12 h-12" />,
      title: 'UK Youngsters',
      subtitle: 'Empowering British Youth',
      description: 'Supporting disadvantaged youth across the UK with comprehensive programs that combine education, mentorship, and skills development to break the cycle of poverty.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
      stats: [
        { number: '5,000+', label: 'Youth Supported' },
        { number: '50', label: 'Partner Schools' },
        { number: '200', label: 'Active Mentors' }
      ],
      features: [
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'After-School Programs',
          description: 'Academic tutoring, homework support, and enrichment activities'
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Mentorship Networks',
          description: 'One-on-one mentoring with professionals and role models'
        },
        {
          icon: <Lightbulb className="w-6 h-6" />,
          title: 'Skills Workshops',
          description: 'Career development, financial literacy, and life skills training'
        },
        {
          icon: <Briefcase className="w-6 h-6" />,
          title: 'Work Experience',
          description: 'Internships and job shadowing opportunities with local businesses'
        }
      ],
      locations: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Glasgow'],
      impact: 'Our UK programs have helped 5,000+ young people improve their academic performance, with 85% going on to further education or employment.',
      howToHelp: [
        'Become a mentor for £0 (volunteer your time)',
        'Sponsor after-school programs for £100/month',
        'Provide work experience opportunities',
        'Donate equipment and learning resources'
      ]
    },
    {
      id: 'overseas',
      category: 'Infrastructure',
      icon: <Home className="w-12 h-12" />,
      title: 'Overseas Youngsters',
      subtitle: 'Building Educational Infrastructure',
      description: 'Creating sustainable educational opportunities in developing countries by building schools, training teachers, and providing essential resources to remote communities.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
      stats: [
        { number: '7,500+', label: 'Students Enrolled' },
        { number: '45', label: 'Schools Built' },
        { number: '18', label: 'Countries' }
      ],
      features: [
        {
          icon: <Home className="w-6 h-6" />,
          title: 'School Construction',
          description: 'Building modern, safe school facilities in underserved areas'
        },
        {
          icon: <Users className="w-6 h-6" />,
          title: 'Teacher Training',
          description: 'Comprehensive training programs for local educators'
        },
        {
          icon: <BookOpen className="w-6 h-6" />,
          title: 'Educational Resources',
          description: 'Books, supplies, and technology for effective learning'
        },
        {
          icon: <Heart className="w-6 h-6" />,
          title: 'Community Engagement',
          description: 'Working with local communities to ensure program sustainability'
        }
      ],
      locations: ['Kenya', 'Tanzania', 'India', 'Nepal', 'Cambodia', 'Philippines'],
      impact: 'We\'ve built 45 schools serving over 7,500 students in remote areas, with 95% of students showing improved literacy and numeracy.',
      howToHelp: [
        'Build a classroom for £10,000',
        'Sponsor a teacher\'s salary for £200/month',
        'Provide school supplies for £500',
        'Fund a complete school for £50,000'
      ]
    }
  ];

  const filteredPrograms = selectedProgram === 'all' 
    ? programs 
    : programs.filter(p => p.id === selectedProgram);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-500 bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold">GLOBAL IMPACT</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl text-gray-300">
              Comprehensive educational initiatives designed to create lasting change in children's lives worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Program Filter */}
      <section className="bg-white py-8 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setSelectedProgram('all')}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedProgram === 'all' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Programs
            </button>
            <button 
              onClick={() => setSelectedProgram('ukraine')}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedProgram === 'ukraine' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ukraine Assistance
            </button>
            <button 
              onClick={() => setSelectedProgram('uk-youngsters')}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedProgram === 'uk-youngsters' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              UK Youngsters
            </button>
            <button 
              onClick={() => setSelectedProgram('overseas')}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedProgram === 'overseas' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Overseas Youngsters
            </button>
          </div>
        </div>
      </section>

      {/* Programs Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPrograms.map((program, index) => (
            <div key={program.id} className={`${index > 0 ? 'mt-20' : ''}`}>
              {/* Program Header */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-12">
                    <div className="inline-block bg-gray-900 rounded-2xl p-4 mb-6">
                      <div className="text-white">{program.icon}</div>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 mb-2">{program.category}</div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">{program.title}</h2>
                    <p className="text-xl text-gray-600 mb-6">{program.subtitle}</p>
                    <p className="text-gray-700 mb-8">{program.description}</p>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                      {program.locations.map((location, idx) => (
                        <div key={idx} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-full">
                          <MapPin className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">{location}</span>
                        </div>
                      ))}
                    </div>

                    <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition font-semibold inline-flex items-center space-x-2">
                      <span>Support This Program</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative h-96 md:h-auto">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-8 p-12 bg-gray-50 border-t">
                  {program.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                      <p className="text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {program.features.map((feature, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
                    <div className="bg-blue-100 rounded-xl p-3 inline-block mb-4">
                      <div className="text-blue-600">{feature.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Impact & How to Help */}
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Impact</h3>
                  <p className="text-gray-700">{program.impact}</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How You Can Help</h3>
                  <ul className="space-y-3">
                    {program.howToHelp.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from children whose lives have been transformed through our programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria, 14',
                location: 'Ukraine',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
                story: 'Despite the conflict, I continued my education through TheoTrust\'s mobile learning unit. Now I\'m top of my class!'
              },
              {
                name: 'James, 16',
                location: 'Manchester, UK',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                story: 'The mentorship program changed my life. I went from struggling student to university admission!'
              },
              {
                name: 'Amara, 12',
                location: 'Kenya',
                image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?w=400&h=400&fit=crop',
                story: 'Our new school means I don\'t have to walk 10km anymore. Now I have more time to study and play!'
              }
            ].map((story, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{story.name}</h3>
                  <p className="text-sm text-blue-600 mb-4">{story.location}</p>
                  <p className="text-gray-700 italic">"{story.story}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Make a Difference Today</h2>
          <p className="text-xl text-gray-300 mb-8">
            Your support helps us continue providing life-changing educational opportunities to children worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-full hover:bg-gray-100 transition font-semibold flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Donate Now</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition font-semibold">
              Become a Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;