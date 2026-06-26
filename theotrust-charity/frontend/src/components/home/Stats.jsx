import React from 'react';

const Stats = () => {
  const stats = [
    { number: '1000+', label: 'Children Helped' },
    { number: '50+', label: 'Programs' },
    { number: '20+', label: 'Countries' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <h3 className="text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-700 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;