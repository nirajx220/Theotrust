import React, { useState } from 'react';
import { Users, Shield, Award, Heart, Briefcase } from 'lucide-react';

const Management = () => {
  const [imageErrors, setImageErrors] = useState({});

  const trustees = [
    {
      name: 'James Archer',
      role: 'Chairman',
      images: ['/management/james-archer.png'],
      description: `James spent 9 years in the RAF flying fast jets before moving to British Airways. He now captains the Boeing 787 Dreamliner and travels to most areas of the world. James ran a link of the Chernobyl Children Lifeline Charity in Ashbourne, Derbyshire, prior to joining Theo Trust in 2007. He took over the Chair of the charity in 2021. James holds Level 1 Safeguarding qualifications.`,
      joinedDate: '2007'
    },
    {
      name: 'Jonathan Soar',
      role: 'Treasurer - FCA Retired Company Director',
      images: ['/management/jonathan-soar.png'],
      description: `Jonathan qualified as a Chartered Accountant whilst working in private practice and shortly afterwards moved into the engineering industry. For the rest of his working life Jonathan was involved in the manufacture of components for the motor industry. Jonathan's interests include the outdoors, sailing and classic cars.`,
      additionalInfo: 'He joined the Theo Trust as a Trustee and Treasurer in October 2020.',
      joinedDate: 'October 2020'
    },
    {
      name: 'Nataliia Madzhula',
      role: 'Company Finance Executive & Volunteer Worker',
      images: ['/management/nataliia-madzhula.png'],
      description: `Nataliia, from Ukraine, gained a degree in economics from Cherkasy university. She worked in the accounts department for a local large company for several years before escaping to the UK, with her young daughter, after the outbreak of the full-scale war in Ukraine in 2022. Nataliia soon managed to continue her accountancy career for a small accountancy firm in Ashbourne. Later, she began volunteering for the British Heart Foundation and for Theo Trust.`,
      additionalInfo: `Nataliia's interests include hiking, cycling, swimming, art and creative activities. Nataliia also has extensive experience working with children as a result of spending much of her spare time assisting in a nearby kindergarten. She is delighted to join Theo Trust team.`,
      joinedDate: '2022'
    },
    {
      name: 'Kay Wright',
      role: 'Volunteer Worker',
      images: ['/management/kay-wright.png'],
      description: `Kay currently works as the School Business Officer at a primary school in Ashbourne (16 years). She is also the Clerk to Governors. Kay has a full enhanced DBS certificate and is trained in all aspects of Safeguarding. She is an elected member of the village church PCC. Until last year Kay was the Parish Safeguarding Link for the Ashbourne Benefice, providing help and support to clergy and church members in the 5 churches. Kay is currently the Safeguarding and Welfare Officer for Ashbourne FC.`,
      joinedDate: '2023'
    },
    {
      name: 'Richard Theobald',
      role: 'Founder Member and Retired Head Teacher',
      images: ['/management/richard-theobald.png'],
      description: `Richard retired in 2000 after 21 years as headteacher of two boarding schools. From 1990–2019 he worked as a volunteer carrying out home visits for national charities that funded places for vulnerable children in boarding schools. In 2008, he and his wife retired from active care. He is a keen cyclist and led school biking parties in the UK, Europe and the USA. He still enjoys supporting contacts in Russia.`,
      joinedDate: 'Founder'
    },
    {
      name: 'Rachel Wootton',
      role: 'Retired Equity Fund Manager',
      images: ['/management/rachel-wootton.png'],
      description: `Rachel spent her career working in the Financial Sector in the UK and Germany. She has since worked in primary schools both in the UK and Hong Kong, now dividing her time between the two while working as a tutor. She has been involved in educational and childcare charities since 2006.`,
      additionalInfo: 'Rachel joined Theo Trust as a trustee in November 2023',
      joinedDate: 'November 2023'
    },
    {
      name: 'David Wynne',
      role: 'Retired Deputy Headmaster and Modern Languages Teacher',
      images: ['/management/david-wynne.png'],
      description: `David has spent the majority of his working life in education. During this time he initiated various fund raising schemes, mainly for the benefit of children's charities. Of late he has helped locally with the settlement of Ukrainian families within the Homes For Ukraine scheme. An avid fan of musical theatre, he's also a class 1 football referee!`,
      additionalInfo: 'David joined Theo Trust as a trustee in November 2023',
      joinedDate: 'November 2023'
    },
    {
      name: 'Vivien Soar',
      role: 'Retired School Teacher',
      images: ['/management/vivien-soar.png'],
      description: `Vivien had several years experience working as a teacher in primary education for the state sector. After a career break, having a family, Vivien moved into the private sector to teach English as a foreign language at a preparatory school. Over the next 20 years she became very involved in helping disadvantaged students from oversees. Vivien's interests are varied and include outdoor activities, skiing, sailing and travel.`,
      additionalInfo: 'Vivien joined the Theo Trust as a trustee in October 2020.',
      joinedDate: 'October 2020'
    }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleImageError = (trusteeIndex) => {
    setCurrentImageIndex(prev => {
      const currentIndex = prev[trusteeIndex] || 0;
      const nextIndex = currentIndex + 1;
      
      if (nextIndex >= trustees[trusteeIndex].images.length) {
        setImageErrors(prevErrors => ({ ...prevErrors, [trusteeIndex]: true }));
        return prev;
      }
      
      return { ...prev, [trusteeIndex]: nextIndex };
    });
  };

  const getCurrentImage = (trusteeIndex) => {
    const index = currentImageIndex[trusteeIndex] || 0;
    return trustees[trusteeIndex].images[index];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Compact Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full mb-2 shadow-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-1">Our Leadership Team</h1>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto">
            Meet the dedicated trustees and volunteers who guide Theo Trust's mission
          </p>
        </div>
      </div>

      {/* Compact Mission Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 mb-6">
        <div className="bg-white rounded-xl shadow-xl p-4 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mb-1 shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-0.5 text-xs">Experienced Leadership</h3>
              <p className="text-xs text-gray-600">Decades of expertise</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-600 rounded-full mb-1 shadow-md">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-0.5 text-xs">Passionate Commitment</h3>
              <p className="text-xs text-gray-600">Dedicated to children</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green-600 rounded-full mb-1 shadow-md">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-0.5 text-xs">Proven Track Record</h3>
              <p className="text-xs text-gray-600">Years of impact</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Trustees Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Board of Trustees & Team</h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></div>
        </div>

        <div className="space-y-5">
          {trustees.map((trustee, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } flex flex-col lg:flex`}
            >
              {/* Compact Image Section */}
              <div className="lg:w-1/3 relative overflow-hidden group bg-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
                {!imageErrors[index] ? (
                  <img
                    src={getCurrentImage(index)}
                    alt={trustee.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ minHeight: '250px', maxHeight: '280px', objectFit: 'cover' }}
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100" style={{ minHeight: '250px', maxHeight: '280px' }}>
                    <div className="text-center p-3 z-20">
                      <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {trustee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <p className="text-xs text-gray-600 font-medium">{trustee.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Photo coming soon</p>
                    </div>
                  </div>
                )}
                {/* Joined Badge */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-md z-20">
                  <p className="text-xs font-bold text-gray-900">Joined: {trustee.joinedDate}</p>
                </div>
              </div>

              {/* Compact Content Section */}
              <div className="lg:w-2/3 p-5 lg:p-6">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                      {trustee.role}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {trustee.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-gray-700 leading-relaxed text-xs">
                    {trustee.description}
                  </p>
                  {trustee.additionalInfo && (
                    <p className="text-gray-700 leading-relaxed text-xs border-l-2 border-blue-600 pl-2 italic">
                      {trustee.additionalInfo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Governance Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Our Governance</h3>
                <p className="text-gray-700 leading-relaxed text-xs mb-1">
                  The work of the Theo Trust is managed by its trustees who are appointed for three years and may be re-elected. At the AGM held in November the accounts are presented, and the Trust's safeguarding policy is reviewed. Other meetings are called when there is a need for discussion. Personal details are stored and processed in line with the General Data Protection Regulations.
                </p>
                <p className="text-xs text-gray-600 italic">
                  All trustees serve on a voluntary basis and receive no remuneration for their services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Join Us Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Want to Join Our Team?
          </h2>
          <p className="text-sm text-blue-100 mb-4">
            We're always looking for passionate individuals to help us make a difference
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 bg-white text-blue-600 rounded-lg font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Volunteer With Us
            </a>
            <a
              href="/donate"
              className="inline-flex items-center justify-center px-5 py-2 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              <Heart className="w-4 h-4 mr-2" />
              Support Our Mission
            </a>
          </div>
        </div>
      </div>

      {/* Compact Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-4 text-center border border-gray-100">
          <p className="text-sm text-gray-700 mb-1">
            <strong className="text-base">Registered Charity Number:</strong> <span className="text-blue-600 text-base font-bold">1069814</span> - THEO TRUST
          </p>
          <p className="text-xs text-gray-600">
            All trustees serve on a voluntary basis. Registered with the Charity Commission for England and Wales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Management;